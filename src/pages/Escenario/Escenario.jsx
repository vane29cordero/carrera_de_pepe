import Gallo from "../../components/escenario/Gallo.jsx";
import BotonDerecho from "../../components/escenario/BotonDerecho.jsx";
import BotonIzquierdo from "../../components/escenario/BotonIzquierdo.jsx";
import BotonReinicio from "../../components/escenario/BotonReinicio.jsx";
import { useState } from "react";
import './Escenario.css';

function Escenario() {

    const [posicion, setPosicion] = useState(0);

    function MoverDerecha() {
        setPosicion(posicion + 5);
    }

    function MoverIzquierda() {
        setPosicion(posicion - 5);
    }

    function Reiniciar() {
        setPosicion(0);
    }

    return (
        <>
        <div className="escenario">

            <div className="sol"></div>
            <div className="olas"></div>
            <div className="arena"></div>

            <div className="nube nube1"></div>
            <div className="nube nube2"></div>

            <div className="palmera palmera1"></div>
            <div className="palmera palmera2"></div>

            <h2>Carrera de Pepe</h2>

            <p className="subtitulo">
                🌊 ¡Surfea hasta la meta! 🏄
            </p>

            <div
                className="zona-surf"
                style={{
                    transform: `translateX(${posicion}px)`,
                    transition: "transform 0.2s"
                }}
            >
                <Gallo />
                <div className="tabla"></div>
            </div>

            <br />

            <div className="controles">
                {posicion >= -210 ? (
                    <BotonIzquierdo mover = {MoverIzquierda} />
                ) : (
                    <p> ⚠️ Has alcanzado el límite del escenario</p>
                )}   
                <BotonReinicio mover = {Reiniciar} />
                {posicion <= 210 ? (
                <BotonDerecho mover = {MoverDerecha} />
                ) : (
                    <p> ⚠️ Has alcanzado el límite del escenario</p>
                )}
            </div>

            <h3>Posición actual: {posicion}</h3>
        </div>
        </>
    );
}

export default Escenario;