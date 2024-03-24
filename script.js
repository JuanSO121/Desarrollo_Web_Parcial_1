const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');
let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

const resizeCanvas = () => {
    canvas.width = canvas.parentElement.clientWidth; // Establece el ancho del canvas igual al ancho de su contenedor
    canvas.height = canvas.parentElement.clientHeight; // Establece la altura del canvas igual a la altura de su contenedor
};

resizeCanvas(); // Establece el tamaño inicial del canvas

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
