function Gallo({posicion}){
    return (
        <div className="gallo"
            style = {{
            fontSize: "60px",
            position: "relative",
            left: `${posicion}px`,
            transition: "left 0.2s"
        }}
        >
            🐓
        </div>
    );
}

export default Gallo;