console.log("JavaScript carregado!");

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const board = document.getElementById("board");
const tituloEstagio =
    document.getElementById("tituloEstagio");
    const telaVitoria =
        document.getElementById("telaVitoria");

    const btnVoltarMenu =
        document.getElementById("btnVoltarMenu");

const listaPalavras =
    document.getElementById("listaPalavras");
const btnNovoJogo = document.getElementById("btnNovoJogo");


const transicaoEstagio =
    document.getElementById(
        "transicaoEstagio"
    );

const mensagemTransicao =
    document.getElementById(
        "mensagemTransicao"
    );

const proximoEstagio =
    document.getElementById(
        "proximoEstagio"
    );




let selecionando = false;

let celulasSelecionadas = [];

let primeiraCelulaSelecionada = null;

let palavraDoEstagio = "";



let estagioAtual = 1;

let palavrasDoEstagio = [];

let palavrasEncontradas = [];



btnNovoJogo.addEventListener("click", iniciarJogo);
btnVoltarMenu.addEventListener(
    "click",
    voltarAoMenu
);

document.addEventListener(
    "mouseup",
    finalizarSelecao
);

function iniciarJogo() {

    estagioAtual = 1;

    telaVitoria.classList.add("oculto");

    transicaoEstagio.classList.add("oculto");

    menu.classList.add("oculto");

    game.classList.remove("oculto");

    criarTabuleiro();

}

function criarTabuleiro() {

    board.innerHTML = "";

    tituloEstagio.textContent =
        `Estágio ${estagioAtual}`;

    palavrasEncontradas = [];

    const configuracao =
        obterConfiguracaoEstagio(
            estagioAtual
        );

    const listaDePalavras =
        obterListaPorDificuldade(
            configuracao.dificuldade
        );

    palavrasDoEstagio =
        sortearPalavrasSemRepetir(
            listaDePalavras,
            configuracao.quantidadePalavras
        );

    const matriz =
        criarMatrizVazia();

    const posicoes =
        posicionarVariasPalavras(
            matriz,
            palavrasDoEstagio
        );

    preencherEspacosVazios(
        matriz
    );

    renderizarMatriz(
        matriz
    );

    atualizarPainelPalavras();

    console.log(
        "Palavras do estágio:",
        palavrasDoEstagio
    );

    console.table(
        posicoes
    );

}

function atualizarPainelPalavras() {

    listaPalavras.innerHTML = "";

    for (const palavra of palavrasDoEstagio) {

        const itemPalavra =
            document.createElement("span");

        itemPalavra.classList.add(
            "item-palavra"
        );

        itemPalavra.textContent =
            palavra;

        listaPalavras.appendChild(
            itemPalavra
        );

    }

}

function renderizarMatriz(matriz) {

    for (let linha = 0; linha < matriz.length; linha++) {

        for (
            let coluna = 0;
            coluna < matriz[linha].length;
            coluna++
        ) {

            const celula = document.createElement("div");

            celula.classList.add("celula");

            celula.textContent = matriz[linha][coluna];

            celula.dataset.linha = linha;

            celula.dataset.coluna = coluna;

            celula.addEventListener(
                "mousedown",
                iniciarSelecao
            );

            celula.addEventListener(
                "mouseenter",
                continuarSelecao
            );

            celula.addEventListener(
                "mouseup",
                finalizarSelecao
            );

            board.appendChild(celula);

        }

    }

}

function iniciarSelecao(evento) {



    limparSelecaoAnterior();

    selecionando = true;

    primeiraCelulaSelecionada =
        evento.currentTarget;

    adicionarCelulaSelecionada(
        evento.currentTarget
    );

}

function continuarSelecao(evento) {

    if (!selecionando) {

        return;

    }

    const celulaAtual =
        evento.currentTarget;

    if (
        !selecaoEstaEmLinhaReta(
            primeiraCelulaSelecionada,
            celulaAtual
        )
    ) {

        return;

    }

    adicionarCelulaSelecionada(
        celulaAtual
    );

}





function selecaoEstaEmLinhaReta(
    celulaInicial,
    celulaAtual
) {

    const linhaInicial =
        Number(celulaInicial.dataset.linha);

    const colunaInicial =
        Number(celulaInicial.dataset.coluna);

    const linhaAtual =
        Number(celulaAtual.dataset.linha);

    const colunaAtual =
        Number(celulaAtual.dataset.coluna);

    const diferencaLinha =
        Math.abs(linhaAtual - linhaInicial);

    const diferencaColuna =
        Math.abs(colunaAtual - colunaInicial);

    const mesmaLinha =
        linhaAtual === linhaInicial;

    const mesmaColuna =
        colunaAtual === colunaInicial;

    const mesmaDiagonal =
        diferencaLinha === diferencaColuna;

    return (
        mesmaLinha ||
        mesmaColuna ||
        mesmaDiagonal
    );

}

function atualizarCelulasSelecionadas(
    celulaInicial,
    celulaFinal
) {

    for (const celula of celulasSelecionadas) {
        celula.classList.remove("selecionada");
    }

    celulasSelecionadas = [];

    const linhaInicial =
        Number(celulaInicial.dataset.linha);

    const colunaInicial =
        Number(celulaInicial.dataset.coluna);

    const linhaFinal =
        Number(celulaFinal.dataset.linha);

    const colunaFinal =
        Number(celulaFinal.dataset.coluna);

    const direcaoLinha =
        Math.sign(linhaFinal - linhaInicial);

    const direcaoColuna =
        Math.sign(colunaFinal - colunaInicial);

    let linhaAtual = linhaInicial;
    let colunaAtual = colunaInicial;

    while (true) {

        const celula = obterCelulaPorPosicao(
            linhaAtual,
            colunaAtual
        );

        adicionarCelulaSelecionada(celula);

        if (
            linhaAtual === linhaFinal &&
            colunaAtual === colunaFinal
        ) {
            break;
        }

        linhaAtual += direcaoLinha;
        colunaAtual += direcaoColuna;

    }

}

function obterCelulaPorPosicao(linha, coluna) {

    return board.querySelector(
        `[data-linha="${linha}"][data-coluna="${coluna}"]`
    );

}

function adicionarCelulaSelecionada(celula) {

    if (celulasSelecionadas.includes(celula)) {

        return;

    }

    celulasSelecionadas.push(celula);

    celula.classList.add("selecionada");

}

function finalizarSelecao() {

    if (!selecionando) {
        return;
    }

    selecionando = false;

    const palavraSelecionada =
        obterPalavraSelecionada();

    const palavraInvertida =
        inverterPalavra(
            palavraSelecionada
        );

    const palavraEncontrada =
        palavrasDoEstagio.find(
            palavra =>
                palavra === palavraSelecionada ||
                palavra === palavraInvertida
        );

    if (!palavraEncontrada) {

        console.log(
            "Palavra incorreta."
        );

        limparSelecaoAnterior();

        return;

    }

    const jaFoiEncontrada =
        palavrasEncontradas.includes(
            palavraEncontrada
        );

    if (jaFoiEncontrada) {

        console.log(
            "Essa palavra já foi encontrada."
        );

        limparSelecaoAnterior();

        return;

    }

    marcarPalavraComoEncontrada(
        palavraEncontrada
    );

}

function marcarPalavraComoEncontrada(
    palavraEncontrada
) {

    palavrasEncontradas.push(
        palavraEncontrada
    );

    for (
        const celula of celulasSelecionadas
    ) {

        celula.classList.remove(
            "selecionada"
        );

        celula.classList.add(
            "encontrada"
        );

    }

    marcarPalavraNoPainel(
        palavraEncontrada
    );

    console.log(
        `Palavra encontrada: ${palavraEncontrada}`
    );

    celulasSelecionadas = [];

    primeiraCelulaSelecionada = null;

    verificarConclusaoDoEstagio();

}

function marcarPalavraNoPainel(
    palavraEncontrada
) {

    const itensPalavras =
        listaPalavras.querySelectorAll(
            ".item-palavra"
        );

    for (const item of itensPalavras) {

        if (
            item.textContent ===
            palavraEncontrada
        ) {

            item.classList.add(
                "palavra-encontrada"
            );

            item.textContent =
                `✓ ${palavraEncontrada}`;

        }

    }

}

function verificarConclusaoDoEstagio() {

    const todasForamEncontradas =
        palavrasEncontradas.length ===
        palavrasDoEstagio.length;

    if (!todasForamEncontradas) {
        return;
    }

    console.log(
        `Estágio ${estagioAtual} concluído!`
    );

    if (ehUltimoEstagio(estagioAtual)) {

        finalizarJogo();

        return;

    }

    avancarEstagio();

}

function avancarEstagio() {

    const estagioConcluido =
        estagioAtual;

    estagioAtual++;

    game.classList.add(
        "oculto"
    );

    mensagemTransicao.textContent =
        `Estágio ${estagioConcluido} concluído!`;

    proximoEstagio.textContent =
        `Preparando Estágio ${estagioAtual}...`;

    transicaoEstagio.classList.remove(
        "oculto"
    );

    console.log(
        `Avançando para o estágio ${estagioAtual}`
    );

    setTimeout(
        function() {

            transicaoEstagio.classList.add(
                "oculto"
            );

            game.classList.remove(
                "oculto"
            );

            criarTabuleiro();

        },
        1800
    );

}


function finalizarJogo() {

    console.log(
        "Parabéns! Você concluiu os 5 estágios!"
    );

    game.classList.add("oculto");

    telaVitoria.classList.remove("oculto");

}

function voltarAoMenu() {

    telaVitoria.classList.add("oculto");

    transicaoEstagio.classList.add("oculto");

    game.classList.add("oculto");

    menu.classList.remove("oculto");

    estagioAtual = 1;

    palavrasDoEstagio = [];

    palavrasEncontradas = [];

    board.innerHTML = "";

    listaPalavras.innerHTML = "";

    tituloEstagio.textContent =
        "Estágio 1";

}

function obterPalavraSelecionada() {

    let palavraSelecionada = "";

    for (const celula of celulasSelecionadas) {

        palavraSelecionada +=
            celula.textContent;

    }

    return palavraSelecionada;

}

function inverterPalavra(palavra) {

    return palavra
        .split("")
        .reverse()
        .join("");

}

function limparSelecaoAnterior() {

    for (const celula of celulasSelecionadas) {

        celula.classList.remove("selecionada");

    }

    celulasSelecionadas = [];

}


const configuracaoTeste =
    obterConfiguracaoEstagio(4);

const listaTeste =
    obterListaPorDificuldade(
        configuracaoTeste.dificuldade
    );

const palavrasTeste =
    sortearPalavrasSemRepetir(
        listaTeste,
        configuracaoTeste.quantidadePalavras
    );

console.log(
    "Palavras sorteadas para o estágio 4:",
    palavrasTeste
);



