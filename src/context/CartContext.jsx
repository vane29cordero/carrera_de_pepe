import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const CartContext = createContext();
const CLAVE_CARRITO = "carrito";
const TASA_IVA = 0.19; // IVA 19%

function leerCarritoStorage() {
    try {
        const data = localStorage.getItem(CLAVE_CARRITO);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState(leerCarritoStorage);

    // Persistencia en LocalStorage
    useEffect(() => {
        if (carrito.length > 0) {
            localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
        } else {
            localStorage.removeItem(CLAVE_CARRITO);
        }
    }, [carrito]);

    const agregarAlCarrito = useCallback((producto) => {
        setCarrito((prev) => {
            const yaExiste = prev.find((item) => item.id === producto.id);

            if (yaExiste) {
                return prev.map((item) =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }

            return [
                ...prev,
                {
                    id: producto.id,
                    name: producto.title || producto.name,
                    image: producto.thumbnail || producto.image,
                    categoria: producto.category || producto.brand || "Accesorios Playeros",
                    precio: producto.price || producto.precio || 0,
                    cantidad: 1,
                },
            ];
        });
    }, []);

    const eliminarDelCarrito = useCallback((id) => {
        setCarrito((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const cambiarCantidad = useCallback((id, cantidad) => {
        setCarrito((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item
            )
        );
    }, []);

    const vaciarCarrito = useCallback(() => {
        setCarrito([]);
        localStorage.removeItem(CLAVE_CARRITO); // Garantiza que 'carrito' quede totalmente limpio
    }, []);

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

   const totalConIva = useMemo(
        () => carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
        [carrito]
    );

    const subtotalGeneral = useMemo(
        () => totalConIva / (1 + TASA_IVA),
        [totalConIva]
    );

    const iva = useMemo(
        () => totalConIva - subtotalGeneral,
        [totalConIva, subtotalGeneral]
    );

    return (
        <CartContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                cambiarCantidad,
                vaciarCarrito,
                totalItems,
                subtotalGeneral,
                iva,
                totalConIva,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}