import {
  connect,
} from 'react-redux'
import SubmitButton from '../components/SubmitButton'
import {
  encryptAndSubmit,
} from '../actions'

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick: () => {
      dispatch(encryptAndSubmit())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton)
