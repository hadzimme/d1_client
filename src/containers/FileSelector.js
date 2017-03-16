import {
  connect,
} from 'react-redux'
import FileSelector from '../components/FileSelector'
import {
  setFile,
  setFileRawData,
} from '../actions'

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  const fileReader = new FileReader()
  fileReader.onload = event => {
    dispatch(setFileRawData(event.target.result))
  }
  return {
    handleChange: event => {
      event.preventDefault()
      const file = event.target.files[0]
      dispatch(setFile(file))
      fileReader.readAsArrayBuffer(file)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileSelector)
