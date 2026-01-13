/* --- DATOS: 50 Frases de la Reforma Protestante --- */
const quotesData = [
  { text: "Dios no necesita nuestras buenas obras, pero nuestro vecino sí.", author: "Martín Lutero" },
  { text: "Cuida tu vida, para que no contradiga tu lengua.", author: "Juan Calvino" },
  { text: "La paz si es posible, pero la verdad a cualquier precio.", author: "Martín Lutero" },
  { text: "El corazón humano es una fábrica de ídolos.", author: "Juan Calvino" },
  { text: "Tengo tantas cosas que hacer hoy que pasaré las primeras tres horas orando.", author: "Martín Lutero" },
  { text: "Sin el Evangelio, somos inútiles y vanos; sin él, no somos cristianos.", author: "Ulrico Zuinglio" },
  { text: "La justificación es el artículo sobre el cual la iglesia se mantiene o cae.", author: "Martín Lutero" },
  { text: "La oración es el escudo del alma, el sacrificio a Dios y el azote de Satanás.", author: "John Bunyan" },
  { text: "Un hombre con Dios siempre es mayoría.", author: "John Knox" },
  { text: "Haz todo el bien que puedas, por todos los medios que puedas.", author: "John Wesley" },
  { text: "Señor, ábrele los ojos al Rey de Inglaterra.", author: "William Tyndale" },
  { text: "La Biblia no es antigua ni moderna, es eterna.", author: "Martín Lutero" },
  { text: "La fe nunca sabe a dónde va, pero ama y conoce a Aquel que la guía.", author: "Oswald Chambers" },
  { text: "Cree en Dios y serás salvo; cree en ti mismo y estarás perdido.", author: "John Bunyan" },
  { text: "La humildad es la raíz, madre, nodriza, fundamento y vínculo de todas las virtudes.", author: "San Juan Crisóstomo" },
  { text: "Dame a Escocia o me muero.", author: "John Knox" },
  { text: "Nadie puede negar su propia naturaleza más fácilmente que un pez puede volar.", author: "Martín Lutero" },
  { text: "Todo lo que no es de fe es pecado.", author: "Juan Calvino" },
  { text: "Si Dios está con nosotros, ¿quién contra nosotros?", author: "Ulrico Zuinglio" },
  { text: "La verdadera teología es práctica.", author: "William Perkins" },
  { text: "No hay ni una sola brizna de hierba, no hay color en este mundo que no tenga la intención de hacer que los hombres se regocijen.", author: "Juan Calvino" },
  { text: "Aunque me matare, en Él esperaré.", author: "Job (Citado a menudo)" },
  { text: "Mi conciencia está cautiva de la Palabra de Dios.", author: "Martín Lutero" },
  { text: "El conocimiento de Dios y el conocimiento de nosotros mismos están conectados.", author: "Juan Calvino" },
  { text: "Desafío al Papa y todas sus leyes.", author: "William Tyndale" },
  { text: "Tened buen ánimo, maestro Ridley; hoy encenderemos una vela tal... que nunca se apagará.", author: "Hugh Latimer" },
  { text: "La gracia no es simplemente un favor inmerecido; es un favor contrario al mérito.", author: "Gerhard Forde" },
  { text: "La fe es una confianza viva y audaz en la gracia de Dios.", author: "Martín Lutero" },
  { text: "Dios predestina a nadie a la muerte excepto a través de sus propios pecados.", author: "San Agustín (Influencia Reforma)" },
  { text: "La predicación de la Palabra de Dios es la Palabra de Dios.", author: "Segunda Confesión Helvética" },
  { text: "No intercambiaría mi prisión por un trono.", author: "John Bunyan" },
  { text: "El mundo entero está gobernado por la providencia de Dios.", author: "Ulrico Zuinglio" },
  { text: "Un perro ladra cuando su amo es atacado. Yo sería un cobarde si viera que la verdad de Dios es atacada y permaneciera en silencio.", author: "Juan Calvino" },
  { text: "La oración no es para cambiar los planes de Dios, sino para confiar en ellos.", author: "Martín Lutero" },
  { text: "Somos mendigos, eso es cierto.", author: "Martín Lutero (Últimas palabras)" },
  { text: "Arrepentimiento no es solo dejar el pecado, sino odiarlo.", author: "Thomas Watson" },
  { text: "El pecado tiene al diablo por padre, a la vergüenza por compañera y a la muerte por salario.", author: "Thomas Watson" },
  { text: "A Dios sea la gloria.", author: "Lema de la Reforma" },
  { text: "La escritura sola es la reina y la maestra de todas las autoridades.", author: "Martín Lutero" },
  { text: "Cristo no es valorado en absoluto a menos que sea valorado por encima de todo.", author: "San Agustín" },
  { text: "Dios escribe el evangelio no solo en la Biblia, sino en los árboles, las flores, las nubes y las estrellas.", author: "Martín Lutero" },
  { text: "La iglesia reformada, siempre reformándose.", author: "Lema Reformado" },
  { text: "Donde Dios construyó una iglesia, el diablo también construiría una capilla.", author: "Martín Lutero" },
  { text: "No tengo otro refugio que Tu misericordia.", author: "Juan Calvino" },
  { text: "La ignorancia de la Escritura es ignorancia de Cristo.", author: "Jerónimo (Citado en la Reforma)" },
  { text: "El hombre cae según la providencia de Dios, pero cae por su propia culpa.", author: "Juan Calvino" },
  { text: "Sé pecador y peca fuertemente, pero confía y alégrate en Cristo más fuertemente.", author: "Martín Lutero" },
  { text: "La fe justifica sola, pero la fe que justifica no está sola.", author: "Juan Calvino" },
  { text: "El evangelio es la buena noticia de que Dios nos salva, no por lo que hacemos, sino por lo que Cristo hizo.", author: "Resumen Reforma" },
  { text: "Después de la oscuridad, luz.", author: "Lema de la Reforma (Post Tenebras Lux)" }
];

/* --- COLORES (Para el cambio dinámico) --- */
const colors = [
  '#7a201b', '#16a085', '#27ae60', '#2c3e50', 
  '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', 
  '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857'
];

/* --- COMPONENTE PRINCIPAL --- */
const App = () => {
  const [quote, setQuote] = React.useState(quotesData[0]);
  const [accentColor, setAccentColor] = React.useState(colors[0]);
  const [fade, setFade] = React.useState(true);

  // Efecto que pinta el body con el color seleccionado
  React.useEffect(() => {
    document.body.style.backgroundColor = accentColor;
  }, [accentColor]);

  const getNewQuote = () => {
    setFade(false); // Desvanece el texto
    
    setTimeout(() => {
      // Selección aleatoria de Cita
      let randomQuoteIndex = Math.floor(Math.random() * quotesData.length);
      
      // Selección aleatoria de Color
      let randomColorIndex = Math.floor(Math.random() * colors.length);
      
      setQuote(quotesData[randomQuoteIndex]);
      setAccentColor(colors[randomColorIndex]);
      setFade(true); // Muestra el texto de nuevo
    }, 500); // 500ms coincide con la transición rápida
  };

  return (
    <React.Fragment>
      <h1 className="main-title" style={{ color: 'white' }}>
        Grandes Frases de los Reformadores
      </h1>

      <div id="quote-box">
        {/* TEXTO DE LA CITA */}
        <div id="text" style={{ color: accentColor, opacity: fade ? 1 : 0 }}>
          <i className="fas fa-quote-left"></i> {quote.text}
        </div>
        
        {/* AUTOR */}
        <div id="author" style={{ color: accentColor, opacity: fade ? 1 : 0 }}>
          - {quote.author}
        </div>

        {/* BOTONES */}
        <div className="buttons">
          <a
            id="tweet-quote"
            className="button"
            style={{ backgroundColor: accentColor }}
            href={`https://twitter.com/intent/tweet?text="${quote.text}" - ${quote.author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i> Twitter
          </a>
          
          <button 
            id="new-quote" 
            className="button" 
            style={{ backgroundColor: accentColor }}
            onClick={getNewQuote}
          >
            Nueva Cita
          </button>
        </div>
      </div>

      <div className="author-credit">
        by Jocsan Bello
      </div>
    </React.Fragment>
  );
};

// --- RENDERIZADO (Actualizado para React 18) ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
