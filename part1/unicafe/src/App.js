import React, { useState } from 'react'


const Statistics = ({ good, neutral, bad }) => {
  console.log(typeof good);
  const total = good + neutral + bad;
  const average = good * 1 + neutral * 0 + bad * -1; // Good = 1, neutral = 0, bad = -1
  const positivePercent = `${(good / total) * 100}%`;

  if (good > 0 || neutral > 0 || bad > 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={total} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positivePercent} />
          </tbody>
        </table>
      </div>
    );
  }
  else return <p>No feedback given</p>;

  // if (good == 0 && neutral == 0 && bad == 0) {
  //   <p>No feedback given</p>;
  // }
  
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodVote = () => setGood(good + 1);

  const handleNeutralVote = () => setNeutral(neutral + 1);

  const handleBadVote = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodVote} text="good" />
      <Button handleClick={handleNeutralVote} text="neutral" />
      <Button handleClick={handleBadVote} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App
// ReactDOM.render(
//   <Clock />,
//   document.getElementById('root')
// );