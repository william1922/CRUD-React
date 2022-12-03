import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Crear from './components/pages/Crear';
import Editar from './components/pages/Editar';
import Home from './components/pages/Home';
import Receta from './components/pages/Receta';
import TablaRecetas from './components/pages/TablaRecetas';
import instance from './api/axios';

function App() {
  const [recetas, setRecetas] = useState([]);
  const [imagenCarrusel, setImagenCarrusel] = useState([]);

  const getApiCarrusel = async() => {
    try{
      const res = await instance.get("/recetas")
      const imgCarrosel = []
      imgCarrosel.push(res.data[res.data.length - 1], res.data[res.data.length - 2], res.data[res.data.length - 3])
      setImagenCarrusel(imgCarrosel)
    } catch (error){
      console.log(error)
    }
  }

  const getApi = async() => {
    try{
      const res = await instance.get("/recetas");
      setRecetas(res.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getApiCarrusel()
  }, []
  )

  useEffect(() => {
    getApi()
  }, []
  )

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <main>
        <Routes>
          <Route exact path='/' element={<Home recetas={recetas} imagenCarrusel={imagenCarrusel}/>}/>
          <Route exact path='/receta-tabla' element={<TablaRecetas getApi={getApi} getApiCarrusel={getApiCarrusel} recetas={recetas}/>}/>
          <Route exact path='/receta-crear' element={<Crear getApi={getApi} recetas={recetas} getApiCarrusel={getApiCarrusel}/>}/>
          <Route exact path='/receta-editar/:id' element={<Editar getApi={getApi}/>}/>
          <Route exact path='/receta/:id' element={<Receta recetas={recetas}/>}/>
        </Routes>
      </main>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
