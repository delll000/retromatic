import { Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home.jsx';
import NavBar from './components/organisms/NavBar.jsx';
import Footer from './components/organisms/Footer.jsx';




function App() {
  return (
    <div className="grid-background">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
      <Footer />
    </div>
 );
}


export default App;