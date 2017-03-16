import {
  combineReducers,
} from 'redux'
import {
  SET_FILE,
  SET_FILE_RAW_DATA,
  SET_KEY_PAIR,
  SET_REMOTE_PUBLIC_KEY,
  SET_RESULT,
} from './actions'

const initialSocket = new WebSocket('ws://localhost:8080')

const socket = (state = initialSocket, action) => state

const file = (state = null, action) => {
  switch (action.type) {
    case SET_FILE:
      return action.file
    default:
      return state
  }
}

const fileRawData = (state = null, action) => {
  switch (action.type) {
    case SET_FILE_RAW_DATA:
      return action.fileRawData
    default:
      return state
  }
}

const keyPair = (state = null, action) => {
  switch (action.type) {
    case SET_KEY_PAIR:
      return action.keyPair
    default:
      return state
  }
}

const remotePublicKey = (state = null, action) => {
  switch (action.type) {
    case SET_REMOTE_PUBLIC_KEY:
      return action.key
    default:
      return state
  }
}

const result = (state = {}, action) => {
  switch (action.type) {
    case SET_RESULT:
      return action.result
    default:
      return state
  }
}

const rootReducer = combineReducers({
  socket,
  file,
  fileRawData,
  keyPair,
  remotePublicKey,
  result,
})

export default rootReducer
