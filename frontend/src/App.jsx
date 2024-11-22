import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <AppRoutes /> {/* Usa o componente de rotas aqui */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;