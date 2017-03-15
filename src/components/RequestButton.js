import React from 'react'

const RequestButton = props => {
  const { handleClick } = props
  return (
    <button
      onClick={handleClick}
    >ファイルをリクエストする</button>
  )
}

const styles = {
}

export default RequestButton
