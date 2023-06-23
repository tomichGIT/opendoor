export const formatDate = (dateString) => {
    //const dateString = "2023-06-21T23:14:06.000Z";
    const date = new Date(dateString);
    //const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString('es-ES', options);
    //return date.toLocaleString('en-US', options);
}