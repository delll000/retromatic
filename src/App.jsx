import { Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home.jsx";
import NavBar from "./components/organisms/NavBar.jsx";
import Footer from "./components/organisms/Footer.jsx";
import Catalogo from "./pages/user/Catalogo.jsx";
import HomeAdmin from "./pages/admin/HomeAdmin.jsx";
import OrdenesAdmin from "./pages/admin/OrdenesAdmin.jsx";
import JuegosAdmin from "./pages/admin/JuegosAdmin.jsx";
import Contact from "./pages/user/Contact.jsx";
import Login from "./pages/auth/Login.jsx";
import Cart from "./pages/user/Cart.jsx";
import Us from "./pages/user/Us.jsx";
import Register from "./pages/user/Register.jsx";
import HomeConfig from "./pages/admin/HomeConfig.jsx";

function App() {
  return (
    <>
      <NavBar />
      <div className="main-content grid-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/us" element={<Us />} />
          <Route path="/register" element={<Register />} />
          {/* Admin */}
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/admin/home-config" element={<HomeConfig />} />
          <Route path="/admin/juegos" element={<JuegosAdmin />} />
          <Route path="/admin/ordenes" element={<OrdenesAdmin />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
