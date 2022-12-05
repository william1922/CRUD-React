import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import instance from '../../api/axios'

const Receta = () => {
    const [objeto, setObjeto] = useState({});
    const [ingredientes, setIngredientes] = useState([])
    const {id} = useParams();
    
    
    useEffect(() => {
        const getReceta = async () => {
        try {
          const res = await await instance.get(`/recetas/${id}`);
          setObjeto(res.data)
          setIngredientes(res.data.ingredients)

        } catch (error) {
          console.log(error);
        }
      }
      getReceta();
    
    }, []);

  return (
    <div className='container my-3 d-flex flex-column'>
        <h1 className='my-4'>{objeto.title}</h1>
        <img className='imagen-Receta w-50' src={`${objeto.img}`}/>
        <h3 className='mt-4'>Descripcion:</h3>
        <h5 className='mb-4 w-50'>{objeto.descripcion}</h5>
        <h3>Ingredientes:</h3>
        <ul>
           {
            ingredientes.map((element, index) => (
                <li key={index}>{element}</li>
            ))
           }
        </ul>
    </div>
  )
}

export default Receta