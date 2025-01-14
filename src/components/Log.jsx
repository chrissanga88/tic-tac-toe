export default function Log({ turns }) {

  return(
    <ol id="log">
      {/* template literal is used to create a unique key with the row and and col index of the selected square*/}
      {turns.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row}, {turn.square.col}</li>)}
    </ol>
  );
}