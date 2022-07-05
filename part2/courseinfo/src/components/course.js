import React from 'react'
import Header from './header'
import Content from './content'
import Total from './total'

const Course = (props) => {
    return(
        <>
            <Header name = {props.course.name} />
            <Content parts = {props.course.parts} />
            <Total course = {props.course}/>
        </>
    )

}

export default Course; 