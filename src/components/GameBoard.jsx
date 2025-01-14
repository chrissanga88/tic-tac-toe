
export default function GameBoard( { onSelectSquare, board}) {

  //const [ gameBoard, setGameBoard ] = useState(initialGameBoard);

  /*
    Objects & arrays are reference values in JavaScript. They should not be mutated directly - instead create a (deep) copy first using the spread operator and change the copy rather than the original. This avoids bugs if their are multiple places in the application that are scheduling state updates for the same state. 
  */
  //function handleSelectSquare(rowIndex, colIndex) {
    //setGameBoard((prevGameBoard) => {
      /*
        creates a new array and uses the spread operator to paste all the existing elements of the old array, so updatedBoard is a new array object in memory that contains all of the old array elements as child elements. Since initialGameBoard has nested arrays, those should be copied as well by calling the map method on the old array and for every inner array a nested array should be returned and the elements inside of it should be spread as well. Ultimately, this creates a brand new array full of brand new nested arrays, which still store the data they did before 
      */
     // const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
      //updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      //return updatedBoard;
    //});

    /*
      executes a functions defined outside of the GameBoard component. This is called lifting state and allows for a state defined outside of the component to be changed in a child component
    */
   // onSelectSquare();
  //}
  return(
    <ol id="game-board">
      {board.map((row, rowIndex) => 
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* An anonymous function must be passed to onclick with the rowIndex and colIndex as arguments. This gives full control of how onSelectSquare will be executed and thus how handleSelectSquare will be executed in App.jsx. Disabled prop is added to button component so that it becomes disabled if the square already contains a player symbol. This prevents the button from being selected multiple times */}
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      )}
    </ol>
  )
}