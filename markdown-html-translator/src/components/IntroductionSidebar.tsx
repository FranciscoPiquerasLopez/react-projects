import { useGlobalStore } from "../hooks/states/useGlobalStore";

const IntroductionSidebar = () => {

    const activeSection = useGlobalStore(state => state.activeSection);
    const setActiveSection = useGlobalStore(state => state.setActiveSection);

    const handleClick = (sectionClicked: string) => {
        setActiveSection(sectionClicked);
    };

    return (
        <div className="introduction__siderightbar">
            <div className="introduction__title">
                <h2>En este artículo</h2>
            </div>
            <div className="introduction__navbar">
                <a onClick={() => handleClick("markdown")} href="#markdown" className={activeSection === "markdown" ? "active" : ""}>Qué es markdown</a>
                <a onClick={() => handleClick("encabezados")} href="#encabezados" className={activeSection === "encabezados" ? "active" : ""}>Encabezados</a>
                <a onClick={() => handleClick("estilosTexto")} href="#estilosTexto" className={activeSection === "estilosTexto" ? "active" : ""}>Estilos de texto</a>
                <a onClick={() => handleClick("blockquote")} href="#blockquote" className={activeSection === "blockquote" ? "active" : ""}>Entrecomillado de texto</a>
                <a onClick={() => handleClick("code")} href="#code" className={activeSection === "code" ? "active" : ""}>Código de cita</a>
                <a onClick={() => handleClick("enlaces")} href="#enlaces" className={activeSection === "enlaces" ? "active" : ""}>Enlaces</a>
                <a onClick={() => handleClick("saltos")} href="#saltos" className={activeSection === "saltos" ? "active" : ""}>Saltos de línea</a>
                <a onClick={() => handleClick("imagenes")} href="#imagenes" className={activeSection === "imagenes" ? "active" : ""}>Imágenes</a>
                <a onClick={() => handleClick("listas")} href="#listas" className={activeSection === "listas" ? "active" : ""}>Listas</a>
                <a onClick={() => handleClick("listasTareas")} href="#listasTareas" className={activeSection === "listasTareas" ? "active" : ""}>Listas de tareas</a>
                <a onClick={() => handleClick("tablas")} href="#tablas" className={activeSection === "tablas" ? "active" : ""}>Tablas</a>
            </div>
        </div>
    );
}

export default IntroductionSidebar;