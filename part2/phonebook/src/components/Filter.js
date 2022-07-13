import React from "react";

const Filter = ({filter, changeHandler}) =>
    <div>filter shown with <input value={filter} onChange={changeHandler}/></div>

export default Filter