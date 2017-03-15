import {
  connect,
} from 'react-redux'
import App from '../components/App'
import {
  addMessage,
  introduceMyself,
  receiveMessage,
} from '../actions'

const mapStateToProps = state => {
  const {
    socket,
    messages,
  } = state
  return {
    socket,
    messages,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => {
      dispatch(addMessage(message))
    },
    handleSocketOpen: () => {
      //dispatch(introduceMyself())
    },
    handleSocketMessage: data => {
      //dispatch(receiveMessage(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
