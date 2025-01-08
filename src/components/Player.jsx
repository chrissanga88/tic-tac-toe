import { useState } from 'react';

export default function Player( { initialName, symbol }) {
  const [ playerName, setPlayerName ] = useState(initialName);
  const [ isEditing, setIsEdition ] = useState(false);

  function handleEditClick() {
    setIsEdition(editing => !editing);
    /*
      setIsEdition(!isEditing) is better than using isEditing ? setIsEdition(false) : setIsEdition(true) but 
      in react when updating state based on the previous value of that state, it is best practice to pass a function
      to the state updating function. This function will automatically be called and will receive the guaranteed latest
      state value instead of running into an issue where a value was scheduled to be changed later, which is what happens when a function is not passed. The parameter in the function can take any name (editing in this case) and takes the value of the current state. The function is then executed and immediately changes the state value. 
    */
  }

  /*
    onChange in the return statement below will trigger for every keystroke and update playerName with each additional character or each deleted character
  */
  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  return(
    <li>
      <span className="player">
        {!isEditing ? <span className="player-name">{playerName}</span> : <input type="text" required value={playerName}onChange={handleNameChange}></input>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}