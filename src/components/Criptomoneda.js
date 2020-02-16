import React from 'react';

function Criptomoneda({cripto}) {
    const {FullName, Name} = cripto.CoinInfo;
    
    return (
        <option value={Name}>{FullName}</option>
    )
}

export default Criptomoneda;