import React from "react";

const Persons = ({personsShow,deleteHandler}) =>
    <div>
    
        {personsShow.map( p =>
            <div key={p.id}>
                <button onClick={() => deleteHandler(p.id)}>Delete</button>
            </div>

        )}


    </div>

export default Persons 