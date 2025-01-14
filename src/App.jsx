import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './winning-combinations';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

// An array of 3 item arrays representing all the possible positions on the game board
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Helper function to derive the active player symbol
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  // If the gameTurn array is not empty and 'X' took the most recent turn, then the current player is set to 'O'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;

  // Compares the three squares that make up the array of each winning combination to see if the game was won
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
    {
      // Dyanamically changes winner to name of the player associated with the symbol in the first square above
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  /*
    creates a new array and uses the spread operator to paste all the existing elements of the old array, so gameBoard is a new array object in memory that contains all of the old array elements as child elements. Since initialGameBoard has nested arrays, those should be copied as well by calling the map method on the old array and for every inner array a nested array should be returned and the elements inside of it should be spread as well. Ultimately, this creates a brand new array full of brand new nested arrays, which still store the data they did before 
  */
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    // overwrites the initialGameBoard data with the turns that have been taken by each player. Does not execute if the turns array is empty
    for (const turn of gameTurns) {
  
      // destructures turn to pull the square and player properties out of the turn in this iteration of the loop
      const { square, player } = turn;
      // destructures square to pull out the row and col properties
      const { row, col } = square; 
  
      // sets the square located at the current row and col index to the current player's symbol
      gameBoard[row][col] = player;
    }
  return gameBoard;
}

function App() {
  const [players, setPlayers]= useState(PLAYERS);
  // gameTurns state is initated with an empty array
  const [gameTurns, setGameTurns] = useState([]);

  // avoids having to manage extra state by deriving the active player from existing gameTurns state
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {

    // Sets the gameTurns array to a new array that includes the square that was selected by the current player
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      /*
        Creates an array of objects (and nested objects) by using the spread operator to copy the existing turns array to a new array (in an immutable way) and adds the new turn object to the front of the array. Each saved object lets us know what square on the gameboard was selected using the row index and column index and identifies which player selected the square. 
      */
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns, ];

      return updatedTurns;
    })
  }

  // Resets gameTurns to an empty array
  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    // Updates players state based on the old state because only one player name is changed at a time, so this maintains the other player's name
    setPlayers(prevPlayers => {
      return {
        // Spreads the old player object then changes only the name that was edited
        ...prevPlayers,
        // JS syntax that dynamically sets the symbol (either X or O) stored in the object to the new name that was input
        [symbol]: newName
      }
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X} 
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            initialName={PLAYERS.O} 
            symbol="O" 
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        {/*The board prop derives the gameboard from the gameTurns array each time a player selects a square*/}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
