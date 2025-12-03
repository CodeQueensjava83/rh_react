import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import QuemSomos from "./pages/quemsomos/QuemSomos";
import OQueFazemos from "./pages/oquefazemos/OQueFazemos";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/oque-fazemos" element={<OQueFazemos />} />

      </Routes>
      <Footer />
    </BrowserRouter>

  );
}
export default App;