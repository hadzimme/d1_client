import React from 'react'

const FileSelector = props => {
  const { handleChange } = props
  return (
    <input
      type="file"
      onChange={handleChange}
    />
  )
}

const styles = {
}

export default FileSelector
