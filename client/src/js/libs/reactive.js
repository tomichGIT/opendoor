/**
 * Usando la funcion vanilla de JS PROXY puedo hacer que mis elementos sean reactivos.
 * solo necesito asignar funciones de set o remove!
 * En definitiva lo que hace es meter mis datos dentro de un array reactivo, y ejeecuta "renderItems()" en cada cambio
 */


// Create a reactive proxy for the myData object
export const setReactive = (myData, renderItems) => {
    const reactiveData = new Proxy(myData, {
        // property by default is the id.
        set(target, property, value) {
      
          target[property] = value;
          //console.log(reactiveData);
          renderItems(); // callback a la función de render del DOM
          return true;
        },
      });
      return reactiveData;
  }