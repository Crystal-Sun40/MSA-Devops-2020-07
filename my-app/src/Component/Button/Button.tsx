import React from 'react';
import { Button as Butt } from '@material-ui/core';
import './Button.css';

interface Props{
    lable: string;
    handleOnClick: ()=>void;
}
function Button(props:Props) {
    return (
        <>
            <Butt variant="contained" color="primary" onClick = {props.handleOnClick}>{props.lable}</Butt>
        </>

    )
}

export default Button
