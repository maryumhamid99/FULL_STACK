import React from 'react'
import Part from './part'

const Content = ({ parts }) => {

    return (
      <>
        {parts.map(
            (part) => <Part part = {part} />
        )}
      </>
    )
  }

export default Content; 