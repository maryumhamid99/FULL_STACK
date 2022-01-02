import React from 'react'

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = ({ props }) => {
  const [part1, part2, part3] = props;
  return (
    <div>
      <p> {part1.name}: {part1.exercises} </p> 
      <p> {part2.name}: {part2.exercises}</p> 
      <p> {part3.name}: {part3.exercises}</p> 
    </div>
  );
};

const Total = ({ props }) => {
  const [part1, part2, part3] = props;  
  return (    
    <div>            
      <p>Total: {part1.exercises + part2.exercises + part3.exercises}  </p> 
    </div>
  );
};

const App = () => { 
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header props={course.name} />
      <Content props={course.parts} />
      <Total  props={course.parts} />
    </div>  
  )
}


export default App