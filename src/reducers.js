import {
  combineReducers,
} from 'redux'
import {
  ADD_MESSAGE,
  UPDATE_FILE,
} from './actions'

const initialSocket = new WebSocket('ws://localhost:8080')

const socket = (state = initialSocket, action) => {
  return state
}

const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.concat(action.message)
    default:
      return state
  }
}

const file = (state = null, action) => {
  switch (action.type) {
    case UPDATE_FILE:
      return action.file
    default:
      return state
  }
}

const rootReducer = combineReducers({
  socket,
  messages,
})

export default rootReducer
