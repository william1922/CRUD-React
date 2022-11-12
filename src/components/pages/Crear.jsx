import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
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

    let ingredientesArray = ingredientes.split("-");

    let nuevaReceta = {
      //id: recetas.length,
      title,
      imagen,
      ingredientesArray,
      descripcion,
    };

    try {
      const res = await fetch("http://localhost:3001/recetas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaReceta),
      });
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
