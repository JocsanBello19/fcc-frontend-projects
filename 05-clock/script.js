const { useState, useEffect, useRef } = React;

const App = () => {
  // --- ESTADOS INICIALES ---
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
   
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutos en segundos
  const [isRunning, setIsRunning] = useState(false);
   
  // Referencia directa al audio para controlar el play/pause sin errores
  const audioRef = useRef(null);

  // --- FORMATEADOR DE TIEMPO (MM:SS) ---
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  // --- MANEJO DE LONGITUD DE SESIÓN/DESCANSO ---
  const changeLength = (type, amount) => {
    // No permitir cambios si el reloj está corriendo
    if (isRunning) return;
    
    if (type === "break") {
      const newLength = breakLength + amount;
      if (newLength > 0 && newLength <= 60) {
        setBreakLength(newLength);
      }
    } else {
      const newLength = sessionLength + amount;
      if (newLength > 0 && newLength <= 60) {
        setSessionLength(newLength);
        setTimeLeft(newLength * 60); // Actualiza la pantalla inmediatamente
      }
    }
  };

  // --- LÓGICA DEL TEMPORIZADOR ---
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          // Lógica crítica de cambio de turno cuando llega a 0
          if (prevTime === 0) {
            // 1. Reproducir Audio
            audioRef.current.play().catch(error => console.log("Audio error:", error));
            
            // 2. Cambiar de Session a Break o viceversa
            if (timerLabel === "Session") {
              setTimerLabel("Break");
              return breakLength * 60;
            } else {
              setTimerLabel("Session");
              return sessionLength * 60;
            }
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timerLabel, breakLength, sessionLength]);

  // --- BOTÓN START/STOP ---
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // --- BOTÓN RESET ---
  const handleReset = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(1500); // 25 * 60
    
    // Detener audio y rebobinar al inicio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="boutique-clock">
      <div className="main-title">25 + 5 Clock</div>

      <div className="controls-wrapper">
        {/* Controles Break */}
        <div className="control-box">
          <h3 id="break-label">Break Length</h3>
          <div className="actions">
            <button id="break-decrement" onClick={() => changeLength("break", -1)}>
              -
            </button>
            <span id="break-length">{breakLength}</span>
            <button id="break-increment" onClick={() => changeLength("break", 1)}>
              +
            </button>
          </div>
        </div>

        {/* Controles Session */}
        <div className="control-box">
          <h3 id="session-label">Session Length</h3>
          <div className="actions">
            <button id="session-decrement" onClick={() => changeLength("session", -1)}>
              -
            </button>
            <span id="session-length">{sessionLength}</span>
            <button id="session-increment" onClick={() => changeLength("session", 1)}>
              +
            </button>
          </div>
        </div>
      </div>

      {/* Pantalla del Reloj */}
      <div className={`timer-display ${timeLeft < 60 ? 'active-red' : ''}`}>
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>

      {/* Botones Principales */}
      <div className="main-controls">
        <button id="start_stop" onClick={handleStartStop}>
          <i className={`fa-solid ${isRunning ? 'fa-pause' : 'fa-play'}`}></i>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={handleReset}>
          <i className="fa-solid fa-rotate-right"></i>
          Reset
        </button>
      </div>

      <div className="signature">Designed by Jocsan Bello</div>

      {/* Elemento de Audio controlado por Ref */}
      <audio
        id="beep"
        preload="auto"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

// --- RENDERIZADO REACT 18 ---
const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App />);
