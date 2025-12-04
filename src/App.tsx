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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1 w-full pt-16 bg-slate-200">
            <Routes>
              {/* Rota pública */}
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/quem-somos" element={<QuemSomos />} />
              <Route path="/oque-fazemos" element={<OQueFazemos />} />
<<<<<<< HEAD
              <Route path="/colaboradores" element={<ListaColaboradores />} />
=======
              <Route path="/colaboradores/all" element={<ListaColaboradores />} />
>>>>>>> d9d9f6d235243f6499ff8acec27737dc686396f1
              <Route path="/cardcolaboradores" element={<FormColaboradores />} />
              <Route path="/editarcolaboradores/:id" element={<FormColaboradores />} />
              <Route path="/deletarcolaboradores/:id" element={<DeletarColaboradores />} />
              <Route path="/departamentos" element={<ListaDepartamentos />} />
              <Route path="/carddepartamentos" element={<FormDepartamentos />} />
              <Route path="/editardepartamentos/:id" element={<FormDepartamentos />} />
              <Route path="/deletardepartamentos/:id" element={<DeletarDepartamentos />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
