import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  validarDescripcion,
  validarIngredientes,
  validarNombreReceta,
  validarUrl,
} from "../validaciones/Validaciones";

const Editar = ({getApi}) => {
  const [objeto, setObjeto] = useState({});

  const {id} = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const getReceta = async () => {
    try {
      const res = await fetch(`http://localhost:3001/recetas/${id}`);
      const result = await res.json();
      const arrayFiltrado = result.ingredientesArray.join('-');
      result.ingredientesArray = arrayFiltrado
      setObjeto(result)
    } catch (error) {
      console.log(error);
    }
  }
  getReceta();
}, []);


  const handleEdit = async(e) => {
    e.preventDefault()
    console.log("saludo")
    let title = e.target.title.value;
    let imagen = e.target.enlace.value;
    let ingredientes = e.target.ingredientes.value;
    let descripcion = e.target.descripcion.value;

    if (
      !validarNombreReceta(title) ||
      !validarUrl(imagen) ||
      !validarIngredientes(ingredientes) ||
      !validarDescripcion(descripcion)
    ) { 
      return alert('Campos incompletos o incorrectos')
    }
    
    let ingredientesArray = ingredientes.split("-")
    
    let nuevaReceta = {
      title,
      imagen,
      ingredientesArray,
      descripcion
    }

    try {
      const res = await fetch(`http://localhost:3001/recetas/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaReceta)
      });
      getApi();
      navigate("/receta-tabla")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='container w-50'>
      <h1>Editar Receta</h1>
      <Form className='container' onSubmit={handleEdit}>
      <Form.Group className="mb-3">
        <Form.Label>Receta</Form.Label>
        <Form.Control type="text" name='title' defaultValue={objeto.title} placeholder="Nombre de receta" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>URL imagen</Form.Label>
        <Form.Control type="text" name='enlace' defaultValue={objeto.imagen} placeholder="http//" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ingredientes (separe los ingredientes con un guion en medio "-")</Form.Label>
        <Form.Control as="textarea" name="ingredientes" placeholder='1 pisca de sal - 1 cucharadita' defaultValue={objeto.ingredientesArray} rows={3} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Descripcion</Form.Label>
        <Form.Control as="textarea" name="descripcion" defaultValue={objeto.descripcion} rows={3} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
    </div>
  )
}

export default Editar