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
import instance from '../../api/axios';



const Editar = ({getApi}) => {
  const [objeto, setObjeto] = useState({});
  const [ingredients, setIngredients] = useState([])

  const {id} = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const getReceta = async () => {
    try {
      const res = await instance.get(`/recetas/${id}`);
      const arrayFiltrado = res.data.ingredients.join('-');
      setIngredients(arrayFiltrado)
      setObjeto(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  getReceta();
}, []);


  const handleEdit = async(e) => {
    e.preventDefault()
    let name = e.target.title.value;
    let img = e.target.enlace.value;
    let ingredientes = e.target.ingredientes.value;
    let descripcion = e.target.descripcion.value;
    let file = e.target.file.value

    if (
      !validarNombreReceta(name) ||
      !validarUrl(img) ||
      !validarIngredientes(ingredientes) ||
      !validarDescripcion(descripcion)
    ) { 
      return alert('Campos incompletos o incorrectos')
    }
    
    let ingredients = ingredientes.split("-")
    
    let nuevaReceta = {
      name,
      img,
      ingredients,
      descripcion
    }
  
    try {
      await instance.put(`/recetas/${id}`, nuevaReceta);
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
        <Form.Control type="text" name='title' defaultValue={objeto.name} placeholder="Nombre de receta" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>URL imagen</Form.Label>
        <Form.Control type="text" name='enlace' defaultValue={objeto.img} placeholder="http//" />
      </Form.Group>
      <Form.Group className="mb-3 d-flex flex-column">
          <Form.Label>Subir Imagen</Form.Label>
        <input type="file" name="file"></input>
        </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ingredientes (separe los ingredientes con un guion en medio "-")</Form.Label>
        <Form.Control as="textarea" name="ingredientes" placeholder='1 pisca de sal - 1 cucharadita' defaultValue={ingredients} rows={3} />
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