// --- 1. CONFIGURACIÓN INICIAL ---
// Truco para evitar error de 'exports' en CodePen
window.exports = {};

// Extraemos Hooks de React global
const { useState } = React;

// --- 2. LÓGICA DEL JUEGO ---

const Board = () => {
  // Estado: Array de 9 posiciones (null, 'X', o 'O')
  const [squares, setSquares] = useState(Array(9).fill(null));
  // Estado: Turno (true = X, false = O)
  const [xIsNext, setXIsNext] = useState(true);

  // Función para calcular ganador
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
      [0, 4, 8], [2, 4, 6]             // Diagonales
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // Si a tiene valor, y es igual a b, y es igual a c...
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Retorna 'X' o 'O'
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);
  
  // Requisito: Detectar empate (si no hay ganador y no quedan nulls)
  const isDraw = !winner && squares.every(square => square !== null);

  // Manejar click en cuadrado
  const handleClick = (i) => {
    // 1. Si ya hay ganador O el cuadro ya tiene valor, no hacer nada
    if (winner || squares[i]) return;

    // 2. Copiar array actual
    const newSquares = squares.slice();
    
    // 3. Marcar con X o O según el turno
    newSquares[i] = xIsNext ? 'X' : 'O';
    
    // 4. Actualizar estado y cambiar turno
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  // Función para reiniciar
  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // Generar mensaje de estado
  let status;
  if (winner) {
    status = `Winner: ${winner} 🎉`;
  } else if (isDraw) {
    status = "Draw! (Empate) 🤝";
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  // Helper para renderizar botón
  const renderSquare = (i) => {
    return (
      <button 
        className={`square ${squares[i] ? squares[i].toLowerCase() : ''}`} 
        onClick={() => handleClick(i)}
      >
        {squares[i]}
      </button>
    );
  };

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      
      {/* Mensaje de Estado */}
      <div className={`status ${winner ? 'winner' : ''}`}>
        {status}
      </div>

      {/* Tablero Grid 3x3 */}
      <div className="board">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      {/* Botón de Reset (Requisito: id="reset") */}
      <button id="reset" onClick={handleReset}>
        <i className="fas fa-redo-alt"></i> Reset Game
      </button>
    </div>
  );
};

// --- 3. EXPORTACIÓN PARA PRUEBAS (TRUCO CODEPEN) ---

// 1. Asignamos a window para que las pruebas lo encuentren
window.Board = Board;

// 2. Renderizamos en el DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Board />);
