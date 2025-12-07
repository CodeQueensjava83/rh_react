import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import DeletarDepartamentos from './components/departamentos/deletardepartamentos/DeletarDepartamentos';
import FormDepartamentos from './components/departamentos/formdepartamentos/FormDepartamentos';
import ListaDepartamentos from './components/departamentos/listadepartamentos/ListaDepartamentos';
import Navbar from './components/navbar/Navbar';
import QuemSomos from './pages/quemsomos/QuemSomos';
import OQueFazemos from './pages/oquefazemos/OQueFazemos';
import Login from './pages/login/Login';
import ListaColaboradores from './components/colaboradores/listacolaboradores/ListaColaboradores';
import FormColaboradores from './components/colaboradores/formcolaboradores/FormColaboradores';
import DeletarColaboradores from './components/colaboradores/deletarcolaboradores/DeletarColaboradores';
import { AuthProvider } from './contexts/AuthContext';
import Cadastro from './pages/cadastro/Cadastro';
import Perfil from './pages/perfil/Perfil';
import AtualizarPerfil from './pages/perfil/AtualizarPerfil';
import Footer from './components/navbar/Navbar';
import ChatFAQ from './components/ChatFAQ';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1 w-full pt-16 bg-slate-200">
            <Routes>
              {/* Rotas públicas */}
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Login />} />
              <Route path="/quem-somos" element={<QuemSomos />} />
              <Route path="/oque-fazemos" element={<OQueFazemos />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/atualizarusuario" element={<AtualizarPerfil />} />
              <Route path="/chat" element={<ChatFAQ />} />

              {/* Colaboradores */}
              <Route path="/colaboradores/all" element={<ListaColaboradores />} />
              <Route path="/colaboradores/novo" element={<FormColaboradores />} />
              <Route path="/colaboradores/editar/:id" element={<FormColaboradores />} />
              <Route path="/colaboradores/deletar/:id" element={<DeletarColaboradores />} />

              {/* Departamentos */}
              <Route path="/departamentos" element={<ListaDepartamentos />} />
              <Route path="/departamentos/novo" element={<FormDepartamentos />} />
              <Route path="/departamentos/editar/:id" element={<FormDepartamentos />} />
              <Route path="/departamentos/deletar/:id" element={<DeletarDepartamentos />} />

              {/* Cadastro */}
              <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
