import ContactoForm from "./ContactoForm";
import { Waves } from "lucide-react";

function Contacto() {
  return (
    <section className="py-12 px-4 sm:px-6 transition-colors duration-300 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contáctanos
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            ¿Tienes alguna consulta sobre pedidos, equipo de surf o deseas comunicarte con el equipo de Pepe el Gallo? Completa el siguiente formulario y responderemos a tus coordenadas lo antes posible.
          </p>
        </div>

        {/* Formulario */}
        <ContactoForm />
      </div>
    </section>
  );
}

export default Contacto;