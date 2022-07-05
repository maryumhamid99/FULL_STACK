import React from 'react'
import Header from './header'
import Content from './content'

const Course = (props) => {
    return(
        <>
            <Header name = {props.course.name} />
            <Content parts = {props.course.parts} />
        </>
    )

}

export default Course; 