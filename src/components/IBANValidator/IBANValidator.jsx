import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { validateIban } from '../../utils/helpers/ibanValidator';

const IBANValidator = () => {
    const [iban, setIban] = useState('');
    const [valid, setValid] = useState(null);

    const handleValidate = () => {
        const newIban = removeWhiteSpaces();
        const isValid = validateIban(newIban);
        setValid(isValid);
    };

    const removeWhiteSpaces = () => {
        const newIban = iban.split(" ").join("");
        setIban(newIban);
        return newIban;
    };

  return (
    <div style={{display: "flex", alignItems:"center"}}>
        <TextField
            sx={{width: "300px", marginRight: "20px"}}
            variant="outlined"
            onInput={(e) => setIban(e.target.value)}
            value={iban}
        />
        <Button onClick={handleValidate}>Validate</Button>
        {valid !== null &&
            (valid ?
            <div style={{color: "green", marginLeft:"50px"}}>VALID</div> :
            <div style={{color: "red", marginLeft:"50px"}}>INVALID</div>
            )
        }
    </div>
    
    );
};

export default IBANValidator;
