const crypto = window.crypto

export const RECEIVE_REQUEST = 'RECEIVE_REQUEST'

export const receiveRequest = user => {
  return {
    type: RECEIVE_REQUEST,
    user,
  }
}

export const GET_REQUEST_DONE = 'GET_REQUEST_DONE'

const getRequestDone = () => {
  return {
    type: GET_REQUEST_DONE,
  }
}

export const requestFile = () => {
  return (dispatch, getState) => {
    const { socket, user } = getState()
    const message = {
      type: 'REQUEST',
      sender: user,
    }
    socket.send(JSON.stringify(message))
    dispatch(sentRequest())
  }
}

export const ADD_MESSAGE = 'ADD_MESSAGE'

export const addMessage = message => {
  return {
    type: ADD_MESSAGE,
    message,
  }
}

export const UPDATE_FILE = 'UPDATE_FILE'

export const updateFile = file => {
  return {
    type: UPDATE_FILE,
    file,
  }
}

export const SET_KEY_PAIR = 'SET_KEY_PAIR'

const setKeyPair = keyPair => {
  return {
    type: SET_KEY_PAIR,
    keyPair,
  }
}

export const SET_PUBLICK_KEY = 'SET_PUBLIC_KEY'

const setPublicKey = publicKey => {
  return {
    type: SET_PUBLIC_KEY,
    publicKey,
  }
}

export const SET_SYMMETRIC_KEY = 'SET_SYMMETRIC_KEY'

export const initKeyPair = () => {
  return dispatch => {
    crypto.subtle.generateKey({
      name: 'ECDH',
      namedCurve: 'P-256',
    }, false, ['deriveKey', 'deriveBits'])
      .then(keyPair => {
        dispatch(setKeyPair(keyPair))
      })
  }
}

export const sendPublicKey = (needResponse = false) => {
  return (dispatch, getState) => {
    const { keyPair } = getState()
    const publicKey = crypto.subtle.exportKey('jwk', keyPair.publicKey)
    if (needResponse)  {
      dispatch(setPublicKey(publicKey))
    }
    socket.send(JSON.stringify({
      type: 'PUBLIC_KEY',
      publicKey,
      needResponse,
    }))
  }
}
