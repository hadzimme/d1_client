import React from 'react'

const FileDownloader = props => {
  const { result, handleClick } = props
  if (result.type) {
    return (
      <div id="fileDownloader">
        <h2>ファイルが届きました</h2>
        <button
          onClick={handleClick}
        >ダウンロードする</button>
      </div>
    )
  }
  return <div />
}

const styles = {
  link: {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}

export default FileDownloader
