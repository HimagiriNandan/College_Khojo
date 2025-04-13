//react files import
import React from 'react'

//css files import
import "../Styles/Toast.css";

const Toast = ({ text, msg }) => {

  return (
    <div className = "toast-container">
      <div className={`toast ${msg ? "toast-error" : "toast-success"}`}>
        {msg ? <img src="Error.webp" className="toast-img"/> : <img src="success.png" className="toast-img"/>}
        <div>
          {msg ? <p className="error-msg">Error</p> : <p className="success-msg">Success</p>}
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default Toast
