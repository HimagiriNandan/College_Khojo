// React Imports
import React from 'react'

// Styles Imports
import "../Styles/Loading.css"

// Main Component
const Loading = () => {
  // Rendered Component
  return (
    <div className="buffer">
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  )
}

export default Loading
