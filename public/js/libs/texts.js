/**
 * Función que reduce textos largos, y le agrega un boton para ver mas o ver menos.
 * El texto debe tener la clase "text-limit" y el parametro data-limit por la cantidad de palabras
 */
export const showHideMoreInfo = () => {
    var textDivs = document.querySelectorAll(".text-limit");

    textDivs.forEach(function(textDiv) {
        var wordLimit = parseInt(textDiv.getAttribute('data-limit'), 10);
        var words = textDiv.textContent.trim().split(' ');

        // console.log("words es", words);
        // console.log("wordLimit es", wordLimit);

        if (words.length > wordLimit) {
            var truncatedText = words.slice(0, wordLimit).join(' ');
            var fullText = words.join(' ');

            var truncatedContent = document.createElement('span');
            truncatedContent.textContent = truncatedText;

            var expandButton = document.createElement('button');
            expandButton.textContent = 'mas..'; // tiene un bug si le agrego espacios a este texto
            expandButton.classList.add('btn', 'btn-link');

            expandButton.addEventListener('click', function() {
                textDiv.textContent = fullText;
                textDiv.appendChild(collapseButton);
            });

            var collapseButton = document.createElement('button');
            collapseButton.textContent = 'menos..'; // tiene un bug si le agrego espacios a este texto
            collapseButton.classList.add('btn', 'btn-link');

            collapseButton.addEventListener('click', function() {
                textDiv.textContent = truncatedText;
                textDiv.appendChild(expandButton);
            });

            // por defecto mostrar el texto truncado
            textDiv.textContent = '';
            textDiv.appendChild(truncatedContent);
            textDiv.appendChild(expandButton);
        } // end if

    });
}


export const shorterText = (texto, maxLength=200) => {
    if (texto.length > maxLength) {
        return texto.substring(0, maxLength - 3) + '...';
      }
      return texto;
}

export const slugCreator = (texto) => {

    return texto.toLowerCase()  // minúsculas
    .replace(/[^a-z]+/g, '-')   // cambia letras raras por -
    .substring(0, 30)           // trunca a 30 caracteres
    .replace(/^-+|-+$/g, '');   // elimina simbolos raros del principio o fin del string
}