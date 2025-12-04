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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1 w-full pt-16 bg-slate-200">
            <Routes>
              {/* Rota pública */}
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Login />} />
              <Route path="/quem-somos" element={<QuemSomos />} />
              <Route path="/oque-fazemos" element={<OQueFazemos />} />
              <Route path="/colaboradores/all" element={<ListaColaboradores />} />
              <Route path="/cardcolaboradores" element={<FormColaboradores />} />
              <Route path="/editarcolaborador/:id" element={<FormColaboradores />} />
              <Route path="/deletarcolaboradores/:id" element={<DeletarColaboradores />} />
              <Route path="/departamentos" element={<ListaDepartamentos />} />
              <Route path="/carddepartamentos" element={<FormDepartamentos />} />
              <Route path="/editardepartamentos/:id" element={<FormDepartamentos />} />
              <Route path="/deletardepartamentos/:id" element={<DeletarDepartamentos />} />
              <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
