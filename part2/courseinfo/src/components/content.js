import React from 'react'
import Part from './part'

const Content = ({ parts }) => {

    return (
      <>
        {parts.map(
            (part) => <Part key={part.id} part = {part} />
        )}
      </>
    )
  }

export default Content; 