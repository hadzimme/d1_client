import React from 'react'

const SubmitButton = props => {
  const { handleClick } = props
  return (
    <button
      onClick={handleClick}
    >ファイルを暗号化して送信する</button>
  )
}

const styles = {
}

export default SubmitButton
