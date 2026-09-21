import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext();
const CLAVE_USUARIO = "usuario";

function leerUsuarioStorage() {
    try {
        const data = localStorage.getItem(CLAVE_USUARIO);
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(leerUsuarioStorage);

    const iniciarSesion = useCallback((datos) => {
        const nuevoUsuario = { correo: datos.correo };
        localStorage.setItem(CLAVE_USUARIO, JSON.stringify(nuevoUsuario));
        setUsuario(nuevoUsuario);
    }, []);

    const cerrarSesion = useCallback(() => {
        localStorage.removeItem(CLAVE_USUARIO);
        setUsuario(null);
    }, []);

    return (
        <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}