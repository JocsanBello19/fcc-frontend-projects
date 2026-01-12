// --- 1. CONFIGURACIÓN INICIAL ---
const { useState, useEffect } = React;

// Configuración de Marked (Para saltos de línea con Enter)
marked.setOptions({
  breaks: true,
  gfm: true
});

/* --- 2. TEXTO POR DEFECTO --- */
const defaultMarkdown = `
# 🐼 Pandas: Data Analysis
## La herramienta definitiva para Python

> "En Dios confiamos. Todos los demás deben traer datos." — W. Edwards Deming

### 1. El Mito Común (Tachado)
Mucha gente piensa esto al iniciar:

~~Excel es mejor que Python porque puedo ver las celdas y soporta millones de filas sin trabarse.~~

**¡FALSO!** Pandas procesa millones de filas en segundos gracias a NumPy, mientras que Excel colapsaría.

### 2. Flujo de Trabajo (Lista Ordenada)
Un Científico de Datos sigue este algoritmo riguroso:

1.  **Importar Librerías**: \`import pandas as pd\`
2.  **Cargar Datos**: Usar \`pd.read_csv('data.csv')\`
3.  **Exploración Inicial**:
    * Ver cabecera: \`df.head()\`
    * Ver info tipos: \`df.info()\`
4.  **Limpieza de Datos (Data Cleaning)**:
    * Eliminar nulos
    * Renombrar columnas
5.  **Análisis Estadístico**: \`df.describe()\`
6.  **Visualización y Reporte**.

### 3. Herramientas de Visualización (Lista Desordenada)
Pandas se integra con muchas librerías gráficas:

-   **Matplotlib** (La base de todo)
-   **Seaborn** (Gráficos estadísticos hermosos)
-   **Plotly** (Gráficos interactivos web)
-   **Bokeh** (Dashboards en tiempo real)

### 4. Fragmento de Código
Así se eliminan las filas vacías en un DataFrame:

\`\`\`python
def limpiar_datos(df):
    # Elimina filas con valores nulos
    return df.dropna()

print("Datos limpios correctamente")
\`\`\`

### 5. Comparativa Rápida
| Característica | Excel | Pandas |
| :--- | :---: | :---: |
| Límite de Filas | ~1 Millón | **RAM del PC** |
| Automatización | Macros (VBA) | **Python Scripts** |
| Curva de Aprendizaje | Baja | **Media/Alta** |

![Logo Pandas](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Pandas_logo.svg/300px-Pandas_logo.svg.png)

Aprende más en [FreeCodeCamp](https://www.freecodecamp.org/).
`.trim();

/* --- 3. COMPONENTES --- */

const Editor = ({ content, handleChange }) => {
  return (
    <div className="window-box editor-box">
      <div className="toolbar">
        <span><i className="fa fa-terminal"></i> editor.md</span>
        <i className="fa fa-expand"></i>
      </div>
      <textarea 
        id="editor" 
        value={content} 
        onChange={handleChange}
      />
    </div>
  );
};

const Previewer = ({ content }) => {
  // AJUSTE CLAVE: Usamos useEffect para que Prism repinte los colores
  // cada vez que el contenido cambie.
  useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, [content]);

  return (
    <div className="window-box preview-box">
      <div className="toolbar">
        <span><i className="fa fa-desktop"></i> visualizador_html</span>
        <i className="fa fa-expand"></i>
      </div>
      <div 
        id="preview"
        dangerouslySetInnerHTML={{
          __html: marked.parse(content)
        }}
      />
    </div>
  );
};

/* --- 4. APP PRINCIPAL --- */
const App = () => {
  const [text, setText] = useState(defaultMarkdown);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="container-fluid app-container">
      <h1 className="main-title">Python <span>Pandas</span> Previewer</h1>
      
      <div className="row">
        {/* Editor */}
        <div className="col-md-6">
          <Editor content={text} handleChange={handleChange} />
        </div>
        
        {/* Visualizador */}
        <div className="col-md-6">
          <Previewer content={text} />
        </div>
      </div>
      
      {/* Firma */}
      <div className="text-center mt-4" style={{color: '#58a6ff', opacity: 0.8, fontFamily: 'Fira Code'}}>
        <small><code>console.log("Hecho por Jocsan Bello | Dev Frontend & Data Analyst");</code></small>
      </div>
    </div>
  );
};

// --- 5. RENDERIZADO REACT 18 ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
