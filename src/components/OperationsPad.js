import React from 'react';
import CalcButton from "./CalcButton";

function OperationsPad(props) {

    const styles = {
        classNames: "btn btn-light calcButton operationButtons"
    };

    return (
        <div>
            <CalcButton value="÷" className={styles.classNames} onClick={props.onClick}/>
            <br/>
            <CalcButton value="x" className={styles.classNames} onClick={props.onClick}/>
            <br/>
            <CalcButton value="-" className={styles.classNames} onClick={props.onClick}/>
            <br/>
            <CalcButton value="+" className={styles.classNames} onClick={props.onClick}/>
            <br/>
            <CalcButton value="=" className={styles.classNames} onClick={props.onClick}/>
            <br/>
        </div>
    );
}
export default OperationsPad;
