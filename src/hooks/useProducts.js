import { useEffect, useState } from "react";

export function useProducts(limit = 6) {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        let activo = true;

        async function cargarProductos() {
            try {
                setCargando(true);

                const respuesta = await fetch(
                    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
                );

                if (!respuesta.ok) throw new Error("No se pudo cargar el catálogo");

                const data = await respuesta.json();

                if (activo) {
                    setProductos(data.products);
                    setTotal(data.total);
                }
            } catch (err) {
                if (activo) setError(err.message);
            } finally {
                if (activo) setCargando(false);
            }
        }

        cargarProductos();
        return () => { activo = false; };

    }, [limit, skip]);

    return { productos, cargando, error, total, skip, setSkip };
}