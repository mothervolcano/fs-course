
import { useState } from 'react';

const Header = (props) => {

  return ( 

    <div>
      
      <h1>{props.course}</h1>

    </div>)
};


const Content = (props) => {

  const content = props.parts.map((part, i) => {

    return ( 

      <div key={i}>
        <h2>{part.title}</h2>
        <p>{part.exercises}</p>
      </div>

    );

  });

  return (
    
    <div>
      
      {content}

    </div>)

};


const Total = (props) => {

  const total = props.parts.map( p => p.exercises ).reduce((acc, n) => acc + n );

  return (

    <div>

      <h4>Total: {total}</h4>

    </div> 
  )

};


const Display = ({counter}) => <div>{counter}</div>;
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>;


const App = () => {

  const [ counter, setCounter ] = useState(0);

  console.log(`.. rendering. COUNTER: ${counter}`)

  const increaseCounter = () => {
    console.log(`.. increasing. COUNTER: ${counter}`)
    setCounter(counter+1)
  };
  const decreaseCounter = () => {
    console.log(`.. decreasing. COUNTER: ${counter}`)
    setCounter(counter-1)
  };
  const resetCounter = () => {
    console.log(`.. resetting. COUNTER: ${counter}`)
    setCounter(0)
  };

  const courseName = "Half Stack application development";

  const parts = [

    { title: "Fundamentals of React", exercises: 10 }, 
    { title: "Using props to pass data", exercises: 7 }, 
    { title: "State of a component", exercises: 14 }

  ];

  return (
    <div>
      <Display counter={counter}/>
      <Button handleClick={increaseCounter} text="Add"/>
      <Button handleClick={decreaseCounter} text="Subtract"/>
      <Button handleClick={resetCounter} text="Reset"/>
      <Header course={courseName} />
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}

export default App
