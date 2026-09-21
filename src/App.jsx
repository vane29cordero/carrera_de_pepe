import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Inicio from './pages/Inicio/Inicio';
import Escenario from './pages/Escenario/Escenario';
import Productos from './pages/Catalogo/Productos';
import Carrito from './pages/Carrito/Carrito';
import Contacto from './pages/Contacto/Contacto';
import PerfilPage from './components/perfil/PerfilPage';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route
                  path='/'
                  element={<Navigate to='/inicio' replace />}
                />
                <Route
                  path='/inicio'
                  element={<Inicio />}
                />
                {/* Se remueve la ruta de /login para evitar la pantalla en blanco */}
                <Route
                  path='/juego'
                  element={<Escenario />}
                />
                <Route
                  path='/productos'
                  element={<Productos />}
                />
                <Route
                  path='/carrito'
                  element={<Carrito />}
                />
                <Route
                  path='/contacto'
                  element={<Contacto />}
                />
                <Route
                  path='/perfil'
                  element={<PerfilPage />}
                />
                {/* Redirección comodín en caso de rutas inexistentes */}
                <Route path="*" element={<Navigate to="/inicio" replace />} />
              </Routes>
            </Layout>
            <ToastContainer 
              position='top-right'
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
            />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;