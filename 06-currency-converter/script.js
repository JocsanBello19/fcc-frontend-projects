/* --- TRUCO PARA EVITAR EL ERROR DE EXPORTS --- */
// Definimos un objeto exports vacío por si Babel intenta usarlo
window.exports = {}; 

/* --- 1. LIBRERÍAS (Extraídas del objeto global) --- */
const { useState, useMemo } = React;
const { createStore } = Redux;
const { Provider, useSelector, useDispatch } = ReactRedux;

/* --- 2. CONFIGURACIÓN REDUX --- */

// Tasas (Hardcoded para cumplir requisito de no ser 1:1)
const INITIAL_RATES = {
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110.0,
  CHF: 0.92,
  XAU: 0.0005 
};

// Actions
const SET_AMOUNT = 'SET_AMOUNT';
const SET_FROM = 'SET_FROM';
const SET_TO = 'SET_TO';

const setAmount = (amount) => ({ type: SET_AMOUNT, payload: amount });
const setFromCurrency = (currency) => ({ type: SET_FROM, payload: currency });
const setToCurrency = (currency) => ({ type: SET_TO, payload: currency });

// Reducer
const initialState = {
  amount: 1,
  fromCurrency: 'USD',
  toCurrency: 'EUR',
  rates: INITIAL_RATES
};

const converterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AMOUNT:
      return { ...state, amount: action.payload };
    case SET_FROM:
      return { ...state, fromCurrency: action.payload };
    case SET_TO:
      return { ...state, toCurrency: action.payload };
    default:
      return state;
  }
};

// Store Global
const store = createStore(converterReducer);

/* --- 3. COMPONENTE REACT --- */

const ConverterLogic = () => {
  const dispatch = useDispatch();
  const { amount, fromCurrency, toCurrency, rates } = useSelector(state => state);

  // --- MEMOIZACIÓN (Requisito CRÍTICO 5 y 6) ---
  
  // Paso 1: Valor Base.
  const baseAmount = useMemo(() => {
    const rate = rates[fromCurrency];
    return parseFloat(amount) / rate;
  }, [amount, fromCurrency, rates]);

  // Paso 2: Valor Final.
  const convertedAmount = useMemo(() => {
    if (isNaN(baseAmount)) return 0;
    return baseAmount * rates[toCurrency];
  }, [baseAmount, toCurrency, rates]);

  // Manejadores
  const handleAmountChange = (e) => dispatch(setAmount(e.target.value));
  const handleFromChange = (e) => dispatch(setFromCurrency(e.target.value));
  const handleToChange = (e) => dispatch(setToCurrency(e.target.value));

  const currencies = Object.keys(rates);

  return (
    <div className="container">
      <div className="luxury-card mx-auto">
        <h2><i className="fas fa-landmark me-2"></i> Royal Exchange</h2>
        
        <div className="row g-4">
          <div className="col-12">
            <div className="input-group-luxury">
              <label className="form-label">Capital a Invertir</label>
              <input 
                type="number" 
                className="custom-control"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-group-luxury">
              <label className="form-label">Divisa Base</label>
              <select 
                className="custom-control" 
                value={fromCurrency} 
                onChange={handleFromChange}
              >
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="col-md-6">
             <div className="input-group-luxury">
              <label className="form-label">Divisa Objetivo</label>
              <select 
                className="custom-control" 
                value={toCurrency} 
                onChange={handleToChange}
              >
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="result-box">
          <span className="result-label">Valoración de Mercado</span>
          <span className="result-amount">
            {convertedAmount.toFixed(2)} {toCurrency}
          </span>
        </div>
        
        <div className="market-info">
           <i className="fas fa-lock"></i> TRANSACCIÓN SEGURA
        </div>
      </div>
    </div>
  );
};

/* --- 4. EXPORTACIÓN MANUAL PARA CODEPEN --- */

// Componente Principal
const CurrencyConverter = () => {
  return (
    <Provider store={store}>
      <ConverterLogic />
    </Provider>
  );
};

// IMPORTANTE: En lugar de 'export', asignamos a window para que las pruebas lo encuentren
window.CurrencyConverter = CurrencyConverter;

// Renderizado en el DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CurrencyConverter />);
