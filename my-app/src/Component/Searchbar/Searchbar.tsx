import React, { ChangeEvent } from 'react';
import './Searchbar.css';
import { TextField } from '@material-ui/core';

interface Props{
    handleOnChange: (value:string)=>void;
}
function SearchBar(props:Props) {
    const handleOnChange=(e:ChangeEvent<HTMLInputElement>)=>{props.handleOnChange(e.target.value)};
    return (
        <div>
            <TextField onChange={handleOnChange} label="search"/>
        </div>
    )
}

export default SearchBar