import React from "react";

const Notification = ({message, error_exixts = false}) => {
    if (message === null) return null
    
    if (message) {
        if (error_exixts) {
          return (
            <div className="error_exixts">
              {message}
            </div>
          )
        } else {
          return (
            <div className="message">
              {message}
            </div>
          )
        }
      }
      return null
}

export default Notification