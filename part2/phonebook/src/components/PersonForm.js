import React from "react";

const PersonForm = ({newName, newNumber, addName, handleNameChange, handleNumberChange}) =>
    <form>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit" onClick={addName}>add</button></div>
    </form>

export default PersonForm 