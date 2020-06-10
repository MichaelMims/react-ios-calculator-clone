import React from 'react';

function CalcButton(props) {

    return (<button className={props.className} type="button" onClick={props.onClick} value={props.value}>{props.value}</button>);
}

export default CalcButton;