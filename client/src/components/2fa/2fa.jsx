import {useState} from "react";
import AuthCode from "react-auth-code-input";
import './2fa.css';

export default function TwoFactor() {
    const [result, setResult] = useState("");
    const handleOnChange = (res) => {
        setResult(res);
      };
    return (
        <div>
            <AuthCode inputClassName="twofa_field" onChange={handleOnChange} allowedCharacters="numeric"/>
            <span>{result}</span>
        </div>
    );
}
