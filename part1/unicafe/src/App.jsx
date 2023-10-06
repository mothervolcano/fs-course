import { useState } from 'react'




// -------------------------------------
// COMPONENTS

const Button = (props) => {

  const {clickHandler, label} = props;

  return ( <button onClick={clickHandler}>{label}</button>)
}


const StatisticLine = (props) => {

  const { text, value } = props;

  return ( 

    <tr>
      <td>{text}</td>
      <td>{value}</td>   
    </tr>

  );
}

const Statistics = (props) => {

  const { allCounts, score } = props;

  const total = allCounts.reduce((acc, count) => acc + count);
  const avg = total ? score/total : 0;
  const positivePercent = total ? allCounts[0]/total*100 : 0;


  if ( total > 0 ) {

    return (

      <div>
        <table>
          <tbody>
            <StatisticLine text="Good" value={allCounts[0]} />
            <StatisticLine text="Neutral" value={allCounts[1]} />
            <StatisticLine text="Bad" value={allCounts[2]} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={avg} />
            <StatisticLine text="Positive" value={positivePercent} />
          </tbody>
        </table>
      </div>
    )
  }

  return (

      <div>

        <p>No Feedback Given Yet...</p>

      </div>

  );
}


const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [score, setScore] = useState(0);


  // -------------------------------------
  // EVENT HANDLERS

  const handleClick = (value) => {

    return () => {
      value === 1 ? setGood(good+1)
      : value === 0 ? setNeutral(neutral+1)
      : value === -1 ? setBad(bad+1)
      : console.log(`ERROR @ handleClick: ${value} is not a valid value`)
      setScore(score+value);
    }
  };

  return (
    <>
      <div>
        
        <h1>Give Feedback</h1>

        <Button clickHandler={handleClick(1)} label="Good"/>
        <Button clickHandler={handleClick(0)} label="Neutral"/>
        <Button clickHandler={handleClick(-1)} label="Bad"/>
        
      </div>

      <div>
        
        <h2>Statistics</h2>

        <Statistics allCounts={[good,neutral,bad]} score={score} />

      </div>

    </>
  )
}

export default App
