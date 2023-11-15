function generateBallot() {
    const listName = document.getElementById('list-name').value;
    const candidate1 = document.getElementById('candidate1').value;
    const candidate2 = document.getElementById('candidate2').value;
    const color1 = document.getElementById('color1').value || '#ff0000'; // Color por defecto si no se selecciona ninguno
    const color2 = document.getElementById('color2').value || '#00ff00'; // Color por defecto si no se selecciona ninguno
    const image = document.getElementById('image-upload').files[0];

    // Validar que se hayan ingresado todos los campos
    if (!listName || !candidate1 || !candidate2 || !image) {
        alert('Por favor, complete todos los campos y cargue una imagen.');
        return;
    }

    // Mostrar la vista previa y generar la boleta
    const previewContainer = document.getElementById('ballot-preview');
    previewContainer.classList.remove('hidden');

    const generatedBallot = document.getElementById('generated-ballot');
    generatedBallot.innerHTML = `
        <div id="top-bar" class="gradient-bar"></div>
        <h3 style="font-size: ${calculateFontSize(listName)}">${listName}</h3>
        <img src="${URL.createObjectURL(image)}" alt="Candidatos" style="width: 100%;">
        <p style="font-size: ${calculateFontSize(candidate1)}">${candidate1}</p>
        <p style="font-size: ${cargosFontSize(candidate1)}">PRESIDENTE</p>
        <p style="font-size: ${calculateFontSize(candidate2)}">${candidate2}</p>
        <p style="font-size: ${cargosFontSize(candidate2)}">VICEPRESIDENTE</p>
        <div id="bottom-bar" class="gradient-bar"></div>
    `;

    // Establecer el color de fondo de las barras
    const topBar = document.getElementById('top-bar');
    const bottomBar = document.getElementById('bottom-bar');
    topBar.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
    bottomBar.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
}

function cargosFontSize (text) {
    const ballotWidth = 435;
    const textWidth = getTextWidth(text, 'bold 20px Arial');
    const fontSize = (ballotWidth / textWidth) * 20 *0.8 *0.7;
    return `${fontSize}px`;
}

function calculateFontSize(text) {
    const ballotWidth = 435;
    const textWidth = getTextWidth(text, 'bold 20px Arial');
    const fontSize = (ballotWidth / textWidth) * 20 * 0.8;
    return `${fontSize}px`;
}

function getTextWidth(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const width = context.measureText(text).width;
    return width;
}


function calculateFontSize(text) {
    const ballotWidth = 435; // Ancho fijo de la boleta
    const textWidth = getTextWidth(text, 'bold 20px Arial'); // Ajusta el tamaño de fuente inicial según tu preferencia
    const fontSize = (ballotWidth / textWidth) * 20; // 20px es el tamaño de fuente inicial
    return `${fontSize}px`;
}

function getTextWidth(text, font) {
    // Crea un elemento de lienzo temporal para medir el ancho del texto
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const width = context.measureText(text).width;
    return width;
}



function downloadBallot() {
    const generatedBallot = document.getElementById('generated-ballot');

    // Crear un lienzo temporal para convertir el contenido a una imagen
    const canvas = document.createElement('canvas');
    canvas.width = generatedBallot.clientWidth;
    canvas.height = generatedBallot.clientHeight;
    const ctx = canvas.getContext('2d');

    // Copiar el contenido del div al lienzo
    html2canvas(generatedBallot).then(canvas => {
        // Convertir el lienzo a una URL de datos
        const imageDataURL = canvas.toDataURL('image/png');

        // Crear un enlace de descarga
        const link = document.createElement('a');
        link.href = imageDataURL;
        link.download = 'boleta_electoral.png';

        // Simular clic en el enlace para iniciar la descarga
        link.click();
    });
}
