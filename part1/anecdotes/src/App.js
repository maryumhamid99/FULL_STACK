import React, { useState } from 'react'

const Anecdote = ({ title, anecdote, numVotes }) => (
  <div>
    <h1>{title}</h1>
    <div>{anecdote}</div>
    <div>has {numVotes} votes</div>
  </div>
);

const App = () => {
  const handleNextAnecdote = () => {
    let idx = Math.floor(Math.random() * 6);
    console.log(idx)  
    setSelected(idx);
  };

  const Vote = () => {
    setVote({ 
      [selected]: vote[selected] + 1,
    });
  };

  const anecdotes = [
    
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const maxVotes = Object.keys(vote).sort((a, b) => vote[b] - vote[a])[0];

  return (
    <div>
      <div>
      <Anecdote
        title={"Anecdote of the day"}
        anecdote={anecdotes[selected]}
        numVotes={vote[selected]}
      />
      <button onClick={handleNextAnecdote}>Next anecdote</button>
      <button onClick={Vote}>Vote</button>
      <Anecdote
        title={"Anecdote with most votes"}
        anecdote={anecdotes[maxVotes]}
        numVotes={vote[maxVotes]}
      />
    </div>
    </div>
  )
}

export default App