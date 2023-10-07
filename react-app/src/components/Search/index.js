import React from "react";

function Search(){

    return(
        <>
        <div className="">
            <input
            placeholder="Search For Artist"
            type='input'
            onKeyPress={e => {
                if(e.key == 'Enter'){
                    console.log('Press Enter')
                }
            }}


            />

        </div>
        </>
    )

}
export default Search;
