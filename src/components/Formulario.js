import React, {useState, useEffect} from 'react';
import Criptomoneda from './Criptomoneda';
import Error from './Error';


function Formulario({setMoneda,setCriptomoneda}) {
    const [criptomonedas, setCriptomonedas] = useState([]);
    const [monedaCotizar, setMonedaCotizar] = useState('');
    const [criptoCotizar, setCriptoCotizar] = useState('');
    const [error, setError] = useState(false);

    useEffect(
        () => {
            const consultarAPI = async () => {
                const url      = 'https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD';
                const rqst     = await fetch(url);
                const response = await (rqst.json());
        
                // Colocar respuesta en el state
                setCriptomonedas(response.Data);
            }
            consultarAPI();
        }, []
    );

    // Validar que el usuario llene varios campos
    const cotizarMoneda = e => {
        e.preventDefault();

        // Validar campos
        if (monedaCotizar === '' || criptoCotizar === '' ) {
            setError(true);
            return;
        }

        setError(false);
        setMoneda(monedaCotizar);
        setCriptomoneda(criptoCotizar);
    }

    // Mostrar el error en caso de que exista
    const componente = (error) ? <Error mensaje="Ambos campos son obligatorios" /> : null;

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {componente}

            <div className="row">
                <label>Elige tu moneda</label>
                <select 
                    className="u-full-width"
                    onChange={e => setMonedaCotizar(e.target.value)}
                >
                    <option value="">Elige tu moneda</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="MXN">Peso Mexicano</option>
                    <option value="GBP">Libra Esterlina</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>
            <div className="row">
                <label>Elige tu criptomoneda</label>
                <select 
                    className="u-full-width"
                    onChange={e => setCriptoCotizar(e.target.value)}
                >
                    <option value="">Elige tu criptomoneda</option>
                    {criptomonedas.map(cripto => (
                        <Criptomoneda
                            key    = {cripto.CoinInfo.Id}
                            cripto = {cripto}
                        />                
                    ))}
                    <option></option>
                </select>
            </div>
            <input type="submit" className="button-primary u-full-width" value="Calcular" />
        </form>
    )
};

export default Formulario
