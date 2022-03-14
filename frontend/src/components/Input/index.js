import { useState } from "react";

const Input = ({label, value, setValue, type = 'text'}) => {
    return (
        <div>
            <p>{label}</p>
            <input type={type} value={value} min={0} onChange={setValue} />
        </div>
    )
}

export default Input;