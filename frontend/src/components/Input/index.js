import { useState } from "react";

const Input = ({label}) => {
    const [value, setValue] = useState('');

    return (
        <div>
            <p>{label}</p>
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        </div>
    )
}

export default Input;