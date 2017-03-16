import {
  connect,
} from 'react-redux'
import FileDownloader from '../components/FileDownloader'
import {
  decryptAndDownload,
} from '../actions'

const mapStateToProps = state => {
  const { result } = state
  return {
    result,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick: () => {
      dispatch(decryptAndDownload())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileDownloader)
