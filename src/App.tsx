import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Deletardepartamentos from './components/departamentos/deletardepartamentos/DeletarDepartamentos';
import FormDepartamentos from './components/departamentos/formdepartamentos/FormDepartamentos';
import ListaDepartamentos from './components/departamentos/listadepartamentos/ListaDepartamentos';
import Navbar from './components/navbar/Navbar';

function App() {
	return (
		<>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        
        <Navbar />
        
        <div className="flex-1 w-full pt-16 bg-slate-200">
			<Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/departamentos" element={<ListaDepartamentos />} />
              <Route path="/carddepartamentos" element={<FormDepartamentos />} />
              <Route path="/editardepartamentos/:id" element={<FormDepartamentos />} />
              <Route path="/deletardepartamentos/:id" element={<Deletardepartamentos />} />
			</Routes>
		</div>
		</div>
   	 </BrowserRouter>
	</>
  )

}

export default App
