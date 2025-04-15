//react files import
import React from 'react'

//css files import
import "../Styles/Toast.css";

const Toast = ({ toast }) => {

  return (
    <div className="toast-container">
      <div className={`toast ${toast.type === 'warning' ? "toast-warning" : toast.type === 'error' ? "toast-error" : "toast-success"}`}>
        {toast.type === 'warning' ? (
          <img src="warning.webp" className="toast-img" />
        ) : (toast.type === 'error') ? (
          <img src="Error.webp" className="toast-img" />
        ) : (
          <img src="success.png" className="toast-img" />
        )}
        
        <div>
          {toast.type === 'warning' ? (
            <p className="warning-msg">Warning</p>
          ) : (toast.type === 'error') ? (
            <p className="error-msg">Error</p>
          ) : (
            <p className="success-msg">Success</p>
          )}
          <p>{toast.msg}</p>
        </div>
      </div>
    </div>

  )
}

export default Toast
