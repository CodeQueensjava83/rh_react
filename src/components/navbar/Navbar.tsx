import { Link } from "react-router-dom";
import { List, X, User, CaretDown } from "@phosphor-icons/react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full bg-orange-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">

        {/* LOGO */}
        <Link to="/" className="text-3xl font-extrabold tracking-wide">
          NexumRH
        </Link>

        {/* BOTÃO MOBILE */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <List />}
        </button>

        {/* MENU */}
        <ul
          className={`md:flex gap-10 font-medium md:static absolute bg-orange-500 
          w-full left-0 md:w-auto md:p-0 p-4 transition-all duration-300 
          ${open ? "top-16" : "top-[-500px]"}`}
        >

          {/* SOLUÇÕES + SUBMENU */}
          <li className="relative group">
            <button
              className="flex items-center gap-1 hover:opacity-80 transition 
                         text-lg md:text-xl"
              onClick={() => setSubmenuOpen(!submenuOpen)}
            >
              Soluções <CaretDown size={18} weight="bold" />
            </button>

            {/* SUBMENU DESKTOP */}
            <ul
              className="hidden group-hover:flex flex-col absolute left-0 mt-2 bg-white text-gray-700
              shadow-lg rounded-lg overflow-hidden w-40 transition-all duration-200 z-50"
            >
              <Link to="/colaboradores/all" className="px-4 py-2 hover:bg-orange-100">Colaborador</Link>
              <Link to="/departamentos" className="px-4 py-2 hover:bg-orange-100">Departamento</Link>
              <Link to="/usuarios" className="px-4 py-2 hover:bg-orange-100">Usuário</Link>
            </ul>

            {/* SUBMENU MOBILE */}
            {submenuOpen && (
              <ul className="flex flex-col md:hidden bg-white text-gray-700 mt-2 rounded-lg shadow z-50">
                <Link to="/colaboradores/all" className="px-4 py-2 hover:bg-orange-100">Colaborador</Link>
                <Link to="/departamentos" className="px-4 py-2 hover:bg-orange-100">Departamento</Link>
                <Link to="/usuarios" className="px-4 py-2 hover:bg-orange-100">Usuário</Link>
              </ul>
            )}
          </li>

          {/* O QUE FAZEMOS */}
          <li>
            <Link
              to="/oque-fazemos"
              className="hover:opacity-80 transition text-lg md:text-xl"
            >
              O que fazemos
            </Link>
          </li>

          {/* QUEM SOMOS */}
          <li>
            <Link
              to="/quem-somos"
              className="hover:opacity-80 transition text-lg md:text-xl"
            >
              Quem Somos
            </Link>
          </li>

          {/* PERFIL */}
          <li>
            <Link
              to="/perfil"
              className="flex items-center gap-2 border border-white rounded-full px-5 py-2 
                        hover:bg-white hover:text-orange-500 transition font-semibold
                        text-lg md:text-xl"
            >
              <User size={22} weight="bold" /> Perfil
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
