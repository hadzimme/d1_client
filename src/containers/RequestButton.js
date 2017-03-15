import {
  connect,
} from 'react-redux'
import RequestButton from '../components/RequestButton'
import {
  requestFile,
} from '../actions'

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick: () => {
      dispatch(requestFile())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestButton)
