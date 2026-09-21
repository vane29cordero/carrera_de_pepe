import Header from "./Head";
import Navbar from "./Nav";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#071321] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

export default Layout;