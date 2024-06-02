const random = (min, max) => {
    const rand = min + Math.random() * (max - min + 1);
    return Math.floor(rand);
}

const btn = document.querySelector('#btn');

btn.addEventListener('mouseenter', () => {
    btn.style.left = `${random(10, 90)}%`;
    btn.style.top = `${random(10, 90)}%`;
});
btn.addEventListener('click', () => {
    alert('Победа!');
});
