import React from "react";

const Notification = ({ message, error }) => {
    if (message === null) {
      return <div>{message}</div>
    }
  
    if (error) {
      return (
        <div className="error">
          {message}
        </div>
      )
    }
  
    return (
      <div className="message">
        {message}
      </div>
    )
  }
  export default { Notification }