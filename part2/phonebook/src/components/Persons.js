import React from "react";

const Persons = ({personsShow}) =>
    <div>
        {personsShow.map( person => <div key={person.name}> {person.name} {person.number} </div> )}
    </div>

export default Persons 