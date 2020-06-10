import React from 'react';
import CalcButton from "./CalcButton";

function Numpad(props) {

    const styles = {
        classNamesExtraButton: "btn btn-light calcButton numpadExtraButton",
        classNamesNumButton: "btn btn-light calcButton numpadButton"
    };

    return (
        <div>
            <div>
                <CalcButton value={props.allClearValue} className={styles.classNamesExtraButton} onClick={props.onClick}/>
                <CalcButton value="±" className={styles.classNamesExtraButton} onClick={props.onClick}/>
                <CalcButton value="%" className={styles.classNamesExtraButton} onClick={props.onClick}/>
            </div>
            <div>
                <CalcButton value="7" className={styles.classNamesNumButton} onClick={props.onClick}/>
                <CalcButton value="8" className={styles.classNamesNumButton} onClick={props.onClick}/>
                <CalcButton value="9" className={styles.classNamesNumButton} onClick={props.onClick}/>
            </div>
            <div>
                <CalcButton value="4" className={styles.classNamesNumButton} onClick={props.onClick}/>
                <CalcButton value="5" className={styles.classNamesNumButton} onClick={props.onClick}/>
                <CalcButton value="6" className={styles.classNamesNumButton} onClick={props.onClick}/>
            </div>
            <div>
                <CalcButton value="1" className={styles.classNamesNumButton} onClick={props.onClick}/>
                <CalcButton value="2" className={styles.classNamesNumButton} onClick={props.onClick}/>
                <CalcButton value="3" className={styles.classNamesNumButton} onClick={props.onClick}/>
            </div>
            <div className="bottom-row">
                <CalcButton value="0" className={styles.classNamesNumButton + " zeroKey"} onClick={props.onClick}/>
                <CalcButton value="." className={styles.classNamesNumButton + " periodKey"} onClick={props.onClick}/>
            </div>
        </div>
    );
}



export default Numpad;