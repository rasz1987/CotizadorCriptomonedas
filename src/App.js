import React, {useState,useEffect} from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

function App() {
    const [moneda, setMoneda]             = useState('');
    const [criptomoneda, setCriptomoneda] = useState('');
    const [resultado, setResultado]       = useState({});

    useEffect(() => {
        const cotizarCripto = async () => {
            
            if (criptomoneda === '') return;
            
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
            const rqst     = await fetch(url);
            const response = await (rqst.json());
            
            setResultado(response.DISPLAY[criptomoneda][moneda]);
        }
        
        cotizarCripto()
            
    },[ criptomoneda,moneda ]
    );

    return (
        <div className="container">
            <div className="row">
                <div className="one-half column">
                    <img src={imagen} alt="Imagen Criptomonedas" className="logotipo"/>
                </div>
                <div className="one-half column">
                    <h1>Cotiza Criptomonedas al instante</h1>
                    
                    <Formulario 
                        setMoneda       = {setMoneda}
                        setCriptomoneda = {setCriptomoneda}
                    />

                    <Cotizacion 
                        resultado={resultado}
                    />
                </div>
            </div>

            
        </div>
    );
}

export default App;
