/* --- DATA --- */
const bankOne = [
  { keyCode: 81, keyTrigger: 'Q', id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', color: '#ff0055' },
  { keyCode: 87, keyTrigger: 'W', id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', color: '#00ff99' },
  { keyCode: 69, keyTrigger: 'E', id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', color: '#00ccff' },
  { keyCode: 65, keyTrigger: 'A', id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', color: '#ffcc00' },
  { keyCode: 83, keyTrigger: 'S', id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', color: '#cc00ff' },
  { keyCode: 68, keyTrigger: 'D', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', color: '#ff6600' },
  { keyCode: 90, keyTrigger: 'Z', id: "Kick-n'-Hat", url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', color: '#ff00cc' },
  { keyCode: 88, keyTrigger: 'X', id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', color: '#00ff00' },
  { keyCode: 67, keyTrigger: 'C', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', color: '#0099ff' }
];

/* --- COMPONENTE DRUM PAD --- */
const DrumPad = ({ clip, updateDisplay, power, volume }) => {
  const [active, setActive] = React.useState(false);

  const playSound = () => {
    // Si está apagado, no hacemos nada
    if (!power) return;

    const audioTag = document.getElementById(clip.keyTrigger);
    
    // Configurar estado visual
    setActive(true);
    setTimeout(() => setActive(false), 200);
    
    // Configurar audio
    audioTag.currentTime = 0;
    audioTag.volume = volume; // Aplicar volumen actual
    audioTag.play();
    
    updateDisplay(clip.id);
  };

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === clip.keyCode) {
        playSound();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [power, volume]); // Importante: volver a suscribir si cambia power/volume

  // Estilos dinámicos
  const activeStyle = (active && power)
    ? {
        backgroundColor: clip.color,
        boxShadow: `0 0 15px ${clip.color}, 0 0 30px ${clip.color}`,
        color: '#000',
        borderColor: '#fff',
        transform: 'translateY(2px)'
      }
    : {};

  return (
    <div
      className={`drum-pad ${!power ? 'disabled' : ''}`}
      id={clip.id}
      onClick={playSound}
      style={activeStyle}
    >
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  );
};

/* --- COMPONENTE PRINCIPAL (APP) --- */
const App = () => {
  const [display, setDisplay] = React.useState('System Ready');
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(0.5); // 0.0 a 1.0

  // Controlar Volumen
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    if (power) {
      setDisplay("Volume: " + Math.round(e.target.value * 100));
      // Limpiar mensaje de volumen después de 1 seg
      setTimeout(() => setDisplay(""), 1000);
    }
  };

  // Controlar Encendido
  const togglePower = () => {
    setPower(!power);
    setDisplay(!power ? "Welcome" : "");
  };

  return (
    <div id="drum-machine">
      <div className="header">
        <div className="logo"><i className="fa fa-music"></i> CYBER DRUMS</div>
        
        <div className="controls-container">
          {/* BOTÓN POWER */}
          <div className="control-group">
            <span>PWR</span>
            <div className={`power-btn ${power ? 'active' : ''}`} onClick={togglePower}>
              <div className="power-slider"></div>
            </div>
          </div>

          {/* SLIDER VOLUMEN */}
          <div className="control-group">
            <i className="fa fa-volume-up"></i>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={handleVolumeChange}
              disabled={!power} // Deshabilita slider si está apagado
            />
          </div>
        </div>
      </div>
      
      {/* PANTALLA (Display) */}
      <div id="display" className={!power ? 'off' : ''}>
        {power ? display : ""}
      </div>
      
      {/* TECLAS */}
      <div className="pad-bank">
        {bankOne.map((clip) => (
          <DrumPad 
            key={clip.id} 
            clip={clip} 
            updateDisplay={setDisplay} 
            power={power}
            volume={volume}
          />
        ))}
      </div>
      
      {/* Footer */}
       <div style={{marginTop: '20px', color: '#555', fontSize: '0.8rem'}}>
         JOCSAN BELLO EDITION 3000
       </div>
    </div>
  );
};

// --- RENDERIZADO REACT 18 ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
