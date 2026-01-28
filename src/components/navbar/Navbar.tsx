import { Link } from "react-router-dom";
import { CaretDownIcon, ListIcon, UserIcon, XIcon } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Navbar() {
  const { usuario } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  if (!usuario.token) {
    return null;
  }

  function logout() {
    handleLogout();             
    navigate("/home", { replace: true }); 
  }

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
          {open ? <XIcon /> : <ListIcon />}
        </button>

        {/* MENU */}
        <ul
          className={`md:flex md:items-center font-medium md:static absolute bg-orange-500 
            w-full left-0 md:w-auto md:p-0 p-4 transition-all duration-300 
            flex flex-col md:flex-row gap-4
            ${open ? "top-16" : "top-[-500px]"}`}
        >

          {/* SOLUÇÕES + SUBMENU */}
          <li className="relative group flex items-center">
            <button
              className="flex items-center gap-1 hover:opacity-80 transition text-lg md:text-xl"
              onClick={() => setSubmenuOpen(!submenuOpen)}
            >
              Soluções <CaretDownIcon size={18} weight="bold" />
            </button>

            {/* SUBMENU DESKTOP */}
            <ul className="group-hover:flex flex-col absolute left-0 top-full mt-2 bg-white text-gray-700 shadow-lg rounded-lg overflow-hidden opacity-0 
              group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link to="/colaboradores/all" className="px-4 py-2 hover:bg-orange-100">Colaboradores</Link>
              <Link to="/departamentos" className="px-4 py-2 hover:bg-orange-100">Departamentos</Link>
            </ul>

            {/* SUBMENU MOBILE */}
            {submenuOpen && (
              <ul className="flex flex-col md:hidden bg-white text-gray-700 mt-2 rounded-lg shadow z-50">
                <Link to="/colaboradores/all" className="px-4 py-2 hover:bg-orange-100">Colaboradores</Link>
                <Link to="/departamentos" className="px-4 py-2 hover:bg-orange-100">Departamentos</Link>
              </ul>
            )}
          </li>

          {/* O QUE FAZEMOS */}
          <li className="flex items-center">
            <Link
              to="/oque-fazemos"
              className="hover:opacity-80 transition text-lg md:text-xl"
            >
              O que fazemos
            </Link>
          </li>

          {/* QUEM SOMOS */}
          <li className="flex items-center">
            <Link
              to="/quem-somos"
              className="hover:opacity-80 transition text-lg md:text-xl"
            >
              Quem Somos
            </Link>
          </li>

          {/* PERFIL */}
          <li className="flex items-center">
            <Link
              to="/perfil"
              className="flex items-center justify-center gap-2 border border-white rounded-full 
                px-5 py-2 h-12 md:h-auto hover:bg-white hover:text-orange-500
                transition font-semibold text-lg md:text-xl"
            >
              <UserIcon size={22} weight="bold" /> Perfil
            </Link>
          </li>

          {/* Sair */}
          <li className="flex items-center">
            <Link
              to="/logout"
              className="flex items-center gap-2 border border-white rounded-full px-5 py-[7px]
                hover:bg-white hover:text-orange-500 transition font-semibold
                text-lg md:text-xl"
            >
              <UserIcon size={22} weight="bold" /> Sair
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
