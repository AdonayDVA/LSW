const jogadores = document.querySelectorAll('.jogador');

jogadores.forEach(jogador => {
    let offsetX, offsetY;
    let isArrastando = false;

    jogador.addEventListener('mousedown', (e) => {
        isArrastando = true;
        offsetX = e.clientX - jogador.offsetLeft;
        offsetY = e.clientY - jogador.offsetTop;
        jogador.style.cursor = "grabbing";

        const mover = (e) => {
            if (isArrastando) {
                let x = e.clientX - offsetX;
                let y = e.clientY - offsetY;

                const quadra = document.getElementById('quadra');

                if (
                    x >= 0 &&
                    y >= 0 &&
                    x + jogador.offsetWidth <= quadra.clientWidth &&
                    y + jogador.offsetHeight <= quadra.clientHeight
                ) {
                    jogador.style.left = x + "px";
                    jogador.style.top = y + "px";
                }
            }
        };

        const soltar = () => {
            isArrastando = false;
            jogador.style.cursor = "grab";
            document.removeEventListener('mousemove', mover);
            document.removeEventListener('mouseup', soltar);
        };

        document.addEventListener('mousemove', mover);
        document.addEventListener('mouseup', soltar);
    });
});
