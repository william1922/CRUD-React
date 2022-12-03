import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import {
  validarDescripcion,
  validarIngredientes,
  validarNombreReceta,
  validarUrl,
} from "../validaciones/Validaciones";

const Crear = ({ getApi, getApiCarrusel }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    let ingredients = ingredientes.split("-");

    let nuevaReceta = {
      //id: recetas.length,
      name,
      img,
      ingredients,
      descripcion,
      file
    };
  
    try {
      await instance.post(`/recetas`,nuevaReceta);;
      getApi();
      getApiCarrusel();
      navigate("/receta-tabla");
    } catch (error) {
      console.log(error);
    }
    console.log(nuevaReceta);
  };

  return (
    <div className="container w-50 my-3">
      <h1 className="text-center mb-3">Agregar Receta</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Receta</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Nombre de receta"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL imagen</Form.Label>
          <Form.Control type="text" name="enlace" placeholder="http//" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ingredientes (separe los ingredientes con un guion en medio "-")</Form.Label>
          <Form.Control as="textarea" name="ingredientes" rows={3} placeholder='1 pisca de sal - 1 cucharadita'/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control as="textarea" name="descripcion" rows={3} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default Crear;
