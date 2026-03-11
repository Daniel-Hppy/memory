import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Card } from './components/Card'
import { fetchCharacter } from './components/fetchPokemon.js'



function App() {
  const [isClicked, setIsClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [shufflePokemon, setShufflePokemon] = useState([]);
  const [win, setWin] = useState(false);
  const {pokemon, error} = fetchCharacter();

  useEffect(() => {
    if (pokemon.length > 0) setShufflePokemon(pokemon);
  }, [pokemon]);

  function handleClick(id) {
    const alreadyExists = isClicked.some(clickedId => clickedId === id);

    if (alreadyExists) {
      setGameOver(true);
      setScore(0);
      setIsClicked([]);
    } else {
      const newIsClicked = [...isClicked, id];
      setIsClicked(newIsClicked);
      setScore(prev => {
        const newScore = prev + 1;
        if (newScore > highScore) setHighScore(newScore);
        return newScore;
      });

      if (newIsClicked.length === shufflePokemon.length) {
        setGameOver(false);
        setIsClicked([]);
        setScore(0);
        setWin(true);
      }
      setShufflePokemon(prev => [...prev].sort(() => Math.random() - 0.5));
    }
  }

  return (
    <div className='container'>

      {gameOver && (
        <div className='overlay'>
          <div className='popup'>
            <h2>Game Over!</h2>
            <button onClick={() => setGameOver(false)}>Play Again</button>
          </div>
        </div>
      )}

      {win && (
        <div className='overlay'>
          <div className='popup'>
            <h2>You Win!</h2>
            <button onClick={() => setWin(false)}>Play Again</button>
          </div>
        </div>
      )}


      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
      <div className='card-container'>
      {shufflePokemon.map((p) => {
      return  <Card key={p.id} handleClick={() => handleClick(p.id)} image={p.image} name={p.name} />
    })}
      </div>
    </div>
  )
}

export default App
