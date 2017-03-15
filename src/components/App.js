import React, {
  Component,
} from 'react'

class App extends Component {
  componentDidMount() {
    const {
      socket,
      addMessage,
      handleSocketOpen,
      handleSocketMessage,
    } = this.props
    socket.addEventListener('open', event => {
      handleSocketOpen()
    })
    socket.addEventListener('message', event => {
      addMessage(event.data)
      handleSocketMessage(event.data)
    })
  }

  componentWillUnmount() {
    const { socket } = this.props
    socket.close()
  }

  render() {
    const { messages } = this.props
    return (
      <div>
        <h1>Hello, world!</h1>
        {messages.map((item, i) => {
          return <div key={i}>{item}</div>
        })}
      </div>
    )
  }
}

export default App
