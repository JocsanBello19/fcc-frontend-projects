const { useState } = React;

// Orden modificado: Decimal movido al lado del 3.
const buttons = [
  { id: "clear", val: "AC", type: "action", class: "jumbo" },
  { id: "divide", val: "/", type: "operator", class: "operator" },
  { id: "multiply", val: "*", type: "operator", class: "operator" },
  
  { id: "seven", val: "7", type: "number" },
  { id: "eight", val: "8", type: "number" },
  { id: "nine", val: "9", type: "number" },
  { id: "subtract", val: "-", type: "operator", class: "operator" },
  
  { id: "four", val: "4", type: "number" },
  { id: "five", val: "5", type: "number" },
  { id: "six", val: "6", type: "number" },
  { id: "add", val: "+", type: "operator", class: "operator" },
  
  // Fila modificada: 1, 2, 3, .
  { id: "one", val: "1", type: "number" },
  { id: "two", val: "2", type: "number" },
  { id: "three", val: "3", type: "number" },
  { id: "decimal", val: ".", type: "number" }, 
  
  // Fila final: 0 (ancho), = (ancho)
  { id: "zero", val: "0", type: "number", class: "jumbo" },
  { id: "equals", val: "=", type: "action", class: "jumbo" },
];

const App = () => {
  const [expression, setExpression] = useState("");
  const [display, setDisplay] = useState("0");
  const [lastClickedEquals, setLastClickedEquals] = useState(false);

  const handleClear = () => {
    setExpression("");
    setDisplay("0");
    setLastClickedEquals(false);
  };

  const handleNumber = (value) => {
    if (lastClickedEquals) {
      setExpression(value);
      setDisplay(value);
      setLastClickedEquals(false);
    } else {
      if (display === "0" && value === "0") return;
      const isLastCharOperator = /[+\-*/]/.test(display);
      if (display === "0" || isLastCharOperator) {
        setDisplay(value);
      } else {
        setDisplay((prev) => prev + value);
      }
      setExpression((prev) => prev + value);
    }
  };

  const handleDecimal = () => {
    if (lastClickedEquals) {
      setExpression("0.");
      setDisplay("0.");
      setLastClickedEquals(false);
      return;
    }
    const numbers = expression.split(/[+\-*/]/);
    const currentNumber = numbers[numbers.length - 1];
    if (!currentNumber.includes(".")) {
      setDisplay((prev) => prev + ".");
      setExpression((prev) => prev + ".");
    }
  };

  const handleOperator = (value) => {
    if (lastClickedEquals) {
      setLastClickedEquals(false);
      setExpression(display + value);
      setDisplay(value);
      return;
    }
    setDisplay(value);
    const endsWithOperator = /[+\-*/]+$/.test(expression);
    
    if (!endsWithOperator) {
      setExpression((prev) => prev + value);
    } else {
      const lastOp = expression.match(/[+\-*/]+$/)[0];
      if (value === "-") {
        if (lastOp.length === 1) {
           setExpression((prev) => prev + value);
        }
      } else {
        setExpression((prev) => prev.replace(/[+\-*/]+$/, "") + value);
      }
    }
  };

  const handleCalculate = () => {
    try {
      let cleanExpression = expression;
      if (/[+\-*/]$/.test(cleanExpression)) {
        cleanExpression = cleanExpression.slice(0, -1);
      }
      // eslint-disable-next-line no-eval
      const result = eval(cleanExpression);
      const resultString = String(Math.round(result * 10000000000) / 10000000000);
      setDisplay(resultString);
      setExpression(resultString);
      setLastClickedEquals(true);
    } catch (error) {
      setDisplay("Error");
      setExpression("");
      setLastClickedEquals(true);
    }
  };

  const handleClick = (btn) => {
    if (btn.id === "clear") handleClear();
    else if (btn.id === "equals") handleCalculate();
    else if (btn.id === "decimal") handleDecimal();
    else if (btn.type === "operator") handleOperator(btn.val);
    else handleNumber(btn.val);
  };

  return (
    <div className="calculator-shell">
      <div className="display-container">
        <div className="formula-screen">{expression}</div>
        <div id="display">{display}</div>
      </div>
      <div className="buttons-grid">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            id={btn.id}
            className={btn.class || ""}
            onClick={() => handleClick(btn)}
          >
            {btn.val}
          </button>
        ))}
      </div>
      <div className="author">by <span>Jocsan Bello</span></div>
    </div>
  );
};

// --- RENDERIZADO REACT 18 ---
const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App />);
