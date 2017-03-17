import {
  connect,
} from 'react-redux'
import App from '../components/App'
import {
  exportPublicKey,
  importPublicKey,
  setResult,
} from '../actions'

const mapStateToProps = state => {
  const {
    socket,
  } = state
  return {
    socket,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSocketOpen: () => {
      dispatch(exportPublicKey(true))
    },
    handleSocketMessage: data => {
      const message = JSON.parse(data)
      switch (message.type) {
        case 'PUBLIC_KEY':
          if (message.needResponse) {
            dispatch(exportPublicKey())
          }
          dispatch(importPublicKey(message.jwk))
          return
        case 'RESULT':
          dispatch(setResult(message))
          return
        default:
          return
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
