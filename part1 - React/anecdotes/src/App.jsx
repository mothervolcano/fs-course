import { useState } from 'react'


// --------------------------------------
// HELPER FUNCTIONS

const getRandomIndex = (max) => {

  return Math.floor(Math.random() * max);

}

// -------------------------------------
// COMPONENTS


const Button = (props) => {

  const {clickHandler, label} = props;

  return ( <button onClick={clickHandler}>{label}</button>)
}


const AnecdoteHighlight = (props) => {

  const { list, votes } = props;

  const index = votes.indexOf( Math.max(...votes) );

  if ( index !== -1 && Math.max(...votes) > 0 ) {

    return ( 

      <div>
        
        <h2>{list[index]}</h2>
        <h3>{votes[index]}</h3>

      </div>
    )

  } else {

    return (<p>No votes have been cast yet...</p>)

  }
}


// -------------------------------------
// MAIN COMPONENT

const App = () => {
  
  const anecdotes = [
    
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const points = anecdotes.map( n => 0 );


  // ---------------------------------------
  // STATES
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points);


  // ---------------------------------------
  // HANDLERS

  const handleNextBtnClick = () => {

    const rdmIndex = getRandomIndex(anecdotes.length);

    console.log(`TEST RANDOM: ${anecdotes.length} / ${rdmIndex}`)

    setSelected(rdmIndex);
  }

  const handleVoteBtnClick = () => {

    const updatedVotes = votes.slice();
    updatedVotes[selected] += 1;

    setVotes(updatedVotes);
  }


  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button clickHandler={handleVoteBtnClick} label="Vote"/>
      <Button clickHandler={handleNextBtnClick} label="Next Anecdote"/>
      <AnecdoteHighlight list={anecdotes} votes={votes} />
    </div>
  )
}

export default App