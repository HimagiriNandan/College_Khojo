import React from 'react'
import "../Styles/Loading.css"
const Loading = () => {
  return (
    <div className="buffer">
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    </div> // Show loading message
  )
}

export default Loading
