
const regExpProductName = /^[A-Za-z\s?]+$/;
const regExpUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

export const validarNombreReceta = (nombre) => {
    if(regExpProductName.test(nombre) && nombre.trim() !== ""){
        return true;
    } else {
        return false
    }
}

export const validarUrl = (url) => {
    if(regExpUrl.test(url) && url.trim() !== ""){
        return true;
    } else {
        return false
    }
}

export const validarIngredientes = (ingredientes) => {
    if(ingredientes.trim() !== "" || ingredientes.length < 20){
        return true;
    } else {
        return false
    }
}

export const validarDescripcion = (descripcion) => {
    if(descripcion.trim() !== "" || descripcion.length < 10){
        return true;
    } else {
        return false
    }
}