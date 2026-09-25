const elements = {
    tipoSorteio: document.getElementById('tipoSorteio'),
    configNumerica: document.getElementById('configNumerica'),
    configNome: document.getElementById('configNome'),
    min: document.getElementById('min'),
    max: document.getElementById('max'),
    nomes: document.getElementById('nomes'),
    semRepetir: document.getElementById('semRepetir'),
    sortearBtn: document.getElementById('sortearBtn'),
    resultado: document.getElementById('resultado'),
};

const state = {
    numericPool: [],
    namesPool: [],
    animationId: null,
};

function atualizarVisibilidade() {
    const isNumero = elements.tipoSorteio.value === 'numero';
    elements.configNumerica.classList.toggle('hidden', !isNumero);
    elements.configNome.classList.toggle('hidden', isNumero);
}

function redesenharResultado(valor) {
    elements.resultado.textContent = valor;
    elements.resultado.style.transform = 'scale(1.02)';
    setTimeout(() => {
        elements.resultado.style.transform = 'scale(1)';
    }, 180);
}

function animarNumero(valorFinal) {
    const valorInicial = Number.parseInt(elements.resultado.textContent, 10) || 0;
    const duracao = 850;
    const inicio = performance.now();

    function animar(telaAgora) {
        const progresso = Math.min((telaAgora - inicio) / duracao, 1);
        const easing = 1 - Math.pow(1 - progresso, 5);
        const valorAtual = Math.round(valorInicial + (valorFinal - valorInicial) * easing);

        elements.resultado.textContent = valorAtual;

        if (progresso < 1) {
            requestAnimationFrame(animar);
        } else {
            redesenharResultado(valorFinal);
        }
    }

    requestAnimationFrame(animar);
}

function animarTexto(valorFinal, opcoes = []) {
    const valores = [...opcoes, valorFinal];
    let indice = 0;

    clearInterval(state.animationId);
    state.animationId = setInterval(() => {
        elements.resultado.textContent = valores[indice % valores.length];
        indice += 1;

        if (indice >= valores.length + 9) {
            clearInterval(state.animationId);
            redesenharResultado(valorFinal);
        }
    }, 70);
}

function obterNumerosAleatorios(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function prepararPoolNumerico(min, max) {
    if (state.numericPool.length === 0) {
        state.numericPool = window.RaffleCore.createNumberPool(min, max);
    }
}

function sortearNumero() {
    const min = Number.parseInt(elements.min.value, 10);
    const max = Number.parseInt(elements.max.value, 10);

    if (!window.RaffleCore.validateRange(min, max)) {
        alert('Digite um intervalo válido para o sorteio numérico.');
        return;
    }

    if (elements.semRepetir.checked) {
        prepararPoolNumerico(min, max);

        if (state.numericPool.length === 0) {
            alert('Todos os números desse intervalo já foram usados neste ciclo. Reiniciando o sorteio.');
            state.numericPool = window.RaffleCore.createNumberPool(min, max);
        }

        const valorSorteado = window.RaffleCore.drawUniqueValue(state.numericPool);
        animarNumero(valorSorteado);
        return;
    }

    const valorSorteado = obterNumerosAleatorios(min, max);
    animarNumero(valorSorteado);
}

function sortearNome() {
    const nomes = window.RaffleCore.parseCsvNames(elements.nomes.value);

    if (nomes.length === 0) {
        alert('Adicione pelo menos um nome para o sorteio.');
        return;
    }

    if (elements.semRepetir.checked) {
        if (state.namesPool.length === 0) {
            state.namesPool = [...nomes];
        }

        const valorSorteado = window.RaffleCore.drawUniqueValue(state.namesPool);

        if (valorSorteado === null) {
            alert('Todos os nomes já foram sorteados neste ciclo. Reiniciando a lista.');
            state.namesPool = [...nomes];
            const novoValor = window.RaffleCore.drawUniqueValue(state.namesPool);
            animarTexto(novoValor, nomes);
            return;
        }

        animarTexto(valorSorteado, nomes);
        return;
    }

    const valorSorteado = nomes[Math.floor(Math.random() * nomes.length)];
    animarTexto(valorSorteado, nomes);
}

function sortear() {
    if (elements.tipoSorteio.value === 'numero') {
        sortearNumero();
        return;
    }

    sortearNome();
}

elements.tipoSorteio.addEventListener('change', atualizarVisibilidade);
elements.sortearBtn.addEventListener('click', sortear);

atualizarVisibilidade();
redesenharResultado('--');
