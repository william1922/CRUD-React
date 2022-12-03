import React from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import instance from '../../api/axios';

const TablaRecetas = ({recetas, getApi, getApiCarrusel}) => {
console.log(recetas)
  const eliminarReceta = async(id) => {
      try{
        await instance.delete(`/recetas/${id}`);
        getApi();
        getApiCarrusel()
      } catch (error) {
        console.log(error)
      }
    
  }
  return (
    <div className='container d-flex flex-column'>
      <div className='d-flex justify-content-between my-3'>
      <h1>Administrar Recetas</h1>
      <Link to='/receta-crear' className='btn border bg-success text-white d-flex align-self-center'>Agregar Recetas</Link>
      </div>
      <Table  bordered hover>
      <thead>
        <tr>
          <th className='col-md-2'>Nombre</th>
          <th className='col-md-2'>Cantidad Ingredientes</th>
          <th className='col-md-6 text-center'>Descripcion</th>
          <th className='col-md-2'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          recetas.map((receta,index) => (
            <tr key={index}>
            <td>{receta.name}</td>
            <td className='text-center'>{receta.ingredients.length}</td>
            <td className='receta-descripcion-tabla text-center d-flex align-items-center container'>{receta.descripcion}</td>
            <td> 
              <div className='d-flex flex-column justify-content-center align-items-center'>
              <Button className='m-1' variant='warning' href={`/receta-editar/${receta._id}`}>Editar</Button>
              <Button className='m-1' onClick={() => eliminarReceta(receta._id)} variant='danger'>Borrar</Button>
              </div>
            </td>
          </tr>
          ))
        }
      </tbody>
    </Table>
    </div>
  )
}

export default TablaRecetas