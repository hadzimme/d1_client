const crypto = window.crypto

export const SET_FILE = 'SET_FILE'

export const setFile = file => {
  return {
    type: SET_FILE,
    file,
  }
}

export const SET_FILE_RAW_DATA = 'SET_FILE_RAW_DATA'

export const setFileRawData = fileRawData => {
  return {
    type: SET_FILE_RAW_DATA,
    fileRawData,
  }
}

export const SET_KEY_PAIR = 'SET_KEY_PAIR'

const setKeyPair = keyPair => {
  return {
    type: SET_KEY_PAIR,
    keyPair,
  }
}

export const SET_REMOTE_PUBLIC_KEY = 'SET_REMOTE_PUBLIC_KEY'

const setRemotePublicKey = key => {
  return {
    type: SET_REMOTE_PUBLIC_KEY,
    key,
  }
}

export const importPublicKey = jwk => {
  return dispatch => {
    crypto.subtle.importKey('jwk', jwk, {
      name: 'ECDH',
      namedCurve: 'P-256',
    }, false, [])
      .then(key => dispatch(setRemotePublicKey(key)))
      .catch(e => console.log(e.message))
  }
}

export const exportPublicKey = (needResponse = false) => {
  return (dispatch, getState) => {
    const { socket } = getState()
    crypto.subtle.generateKey({
      name: 'ECDH',
      namedCurve: 'P-256',
    }, false, ['deriveKey', 'deriveBits'])
      .then(keyPair => {
        dispatch(setKeyPair(keyPair))
        return crypto.subtle.exportKey('jwk', keyPair.publicKey)
      })
      .then(jwk => {
        socket.send(JSON.stringify({
          type: 'PUBLIC_KEY',
          jwk,
          needResponse,
        }))
      })
      .catch(e => console.log(e.message))
  }
}

export const SET_RESULT = 'SET_RESULT'

export const setResult = result => {
  return {
    type: SET_RESULT,
    result,
  }
}

const encodeBase64URL = data => {
  let str = ''
  if (typeof data === 'string') {
    str = data
  }
  else if (data instanceof Uint8Array) {
    str = String.fromCharCode.apply(null, data)
  }
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

const decodeBase64URL = data => {
  if (typeof data !== 'string') {
    return null
  }
  let decoded = atob(data.replace(/\-/g, '+').replace(/_/g, '/'))
  let buffer = new Uint8Array(decoded.length)
  for (let i = 0; i < data.length; i++) {
    buffer[i] = decoded.charCodeAt(i)
  }
  return buffer
}

export const encryptAndSubmit = () => {
  return (dispatch, getState) => {
    const {
      socket,
      remotePublicKey,
      keyPair,
      file,
      fileRawData,
    } = getState()
    const iv = crypto.getRandomValues(new Uint8Array(12))
    crypto.subtle.deriveKey({
      name: 'ECDH',
      namedCurve: 'P-256',
      public: remotePublicKey,
    }, keyPair.privateKey, {
      name: 'AES-GCM',
      length: 128,
    }, false, ['encrypt', 'decrypt'])
      .then(key => {
        return crypto.subtle.encrypt({
          name: 'AES-GCM',
          iv,
          tagLength: 128,
        }, key, fileRawData)
      })
      .then(data => {
        socket.send(JSON.stringify({
          type: 'RESULT',
          name: file.name,
          contentType: file.type,
          iv: encodeBase64URL(new Uint8Array(iv)),
          data: encodeBase64URL(new Uint8Array(data)),
        }))
      })
      .catch(e => console.log(e.message))
  }
}

export const decryptAndDownload = () => {
  return (dispatch, getState) => {
    const {
      remotePublicKey,
      keyPair,
      result,
    } = getState()
    crypto.subtle.deriveKey({
      name: 'ECDH',
      namedCurve: 'P-256',
      public: remotePublicKey,
    }, keyPair.privateKey, {
      name: 'AES-GCM',
      length: 128,
    }, false, ['encrypt', 'decrypt'])
      .then(key => {
        return crypto.subtle.decrypt({
          name: 'AES-GCM',
          iv: decodeBase64URL(result.iv),
          tagLength: 128,
        }, key, decodeBase64URL(result.data))
      })
      .then(data => {
        const a = document.createElement('a')
        const blob = new Blob([data], { type: result.contentType })
        a.href = window.URL.createObjectURL(blob)
        a.target = '_blank'
        a.download = result.name
        a.click()
      })
      .catch(e => console.log(e.message))
  }
}
