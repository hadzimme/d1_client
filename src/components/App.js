import React, {
  Component,
} from 'react'
import FileSelector from '../containers/FileSelector'
import SubmitButton from '../containers/SubmitButton'
import FileDownloader from '../containers/FileDownloader'

class App extends Component {
  componentDidMount() {
    const {
      socket,
      handleSocketOpen,
      handleSocketMessage,
    } = this.props
    socket.addEventListener('open', event => {
      handleSocketOpen()
    })
    socket.addEventListener('message', event => {
      handleSocketMessage(event.data)
    })
  }

  componentWillUnmount() {
    const { socket } = this.props
    socket.close()
  }

  render() {
    const { result } = this.props
    return (
      <div>
        <h1>TEST</h1>
        <FileSelector />
        <SubmitButton />
        <FileDownloader />
      </div>
    )
  }
}

export default App
