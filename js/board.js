const TAMANHO_TABULEIRO = 15;


/*
    Cria uma matriz 15 x 15.

    Cada posição começa com uma string vazia.
*/
function criarMatrizVazia() {

    const matriz = [];

    for (
        let linha = 0;
        linha < TAMANHO_TABULEIRO;
        linha++
    ) {

        const novaLinha = [];

        for (
            let coluna = 0;
            coluna < TAMANHO_TABULEIRO;
            coluna++
        ) {

            novaLinha.push("");

        }

        matriz.push(novaLinha);

    }

    return matriz;

}


/*
    Gera um número inteiro aleatório.

    Exemplo:
    gerarNumeroAleatorio(15)

    Pode retornar números entre 0 e 14.
*/
function gerarNumeroAleatorio(numeroMaximo) {

    return Math.floor(
        Math.random() * numeroMaximo
    );

}


/*
    Coloca uma palavra na horizontal.

    Exemplo:

    J A V A
*/
function posicionarPalavraHorizontal(
    matriz,
    palavra,
    linha,
    colunaInicial
) {

    for (
        let indice = 0;
        indice < palavra.length;
        indice++
    ) {

        matriz[linha][colunaInicial + indice] =
            palavra[indice];

    }

}


/*
    Coloca uma palavra na vertical.

    Exemplo:

    J
    A
    V
    A
*/
function posicionarPalavraVertical(
    matriz,
    palavra,
    linhaInicial,
    coluna
) {

    for (
        let indice = 0;
        indice < palavra.length;
        indice++
    ) {

        matriz[linhaInicial + indice][coluna] =
            palavra[indice];

    }

}


/*
    Coloca uma palavra na diagonal.

    Exemplo:

    J
      A
        V
          A
*/
function posicionarPalavraDiagonal(
    matriz,
    palavra,
    linhaInicial,
    colunaInicial
) {

    for (
        let indice = 0;
        indice < palavra.length;
        indice++
    ) {

        matriz[
            linhaInicial + indice
        ][
            colunaInicial + indice
        ] = palavra[indice];

    }

}


/*
    Escolhe aleatoriamente uma direção:

    - horizontal
    - vertical
    - diagonal
*/
function posicionarPalavraAleatoria(
    matriz,
    palavra
) {

    const direcoes = [
        {
            nome: "horizontal",
            movimentoLinha: 0,
            movimentoColuna: 1
        },
        {
            nome: "vertical",
            movimentoLinha: 1,
            movimentoColuna: 0
        },
        {
            nome: "diagonal",
            movimentoLinha: 1,
            movimentoColuna: 1
        }
    ];

    const MAXIMO_TENTATIVAS = 100;

    for (
        let tentativa = 0;
        tentativa < MAXIMO_TENTATIVAS;
        tentativa++
    ) {

        const indiceDirecao =
            gerarNumeroAleatorio(
                direcoes.length
            );

        const direcao =
            direcoes[indiceDirecao];

        const posicaoInicial =
            sortearPosicaoInicial(
                palavra,
                direcao
            );

        const podePosicionar =
            verificarSePodePosicionar(
                matriz,
                palavra,
                posicaoInicial.linha,
                posicaoInicial.coluna,
                direcao.movimentoLinha,
                direcao.movimentoColuna
            );

        if (!podePosicionar) {
            continue;
        }

        escreverPalavraNaMatriz(
            matriz,
            palavra,
            posicaoInicial.linha,
            posicaoInicial.coluna,
            direcao.movimentoLinha,
            direcao.movimentoColuna
        );

        console.log(
            `Palavra ${palavra} posicionada na ${direcao.nome}, linha ${posicaoInicial.linha}, coluna ${posicaoInicial.coluna}`
        );

        return {
            palavra: palavra,
            direcao: direcao.nome,
            linha: posicaoInicial.linha,
            coluna: posicaoInicial.coluna
        };

    }

    console.warn(
        `Não foi possível posicionar a palavra ${palavra}.`
    );

    return null;

}

function sortearPosicaoInicial(
    palavra,
    direcao
) {

    const espacoVertical =
        direcao.movimentoLinha *
        (palavra.length - 1);

    const espacoHorizontal =
        direcao.movimentoColuna *
        (palavra.length - 1);

    const quantidadeLinhasPossiveis =
        TAMANHO_TABULEIRO -
        espacoVertical;

    const quantidadeColunasPossiveis =
        TAMANHO_TABULEIRO -
        espacoHorizontal;

    return {
        linha: gerarNumeroAleatorio(
            quantidadeLinhasPossiveis
        ),

        coluna: gerarNumeroAleatorio(
            quantidadeColunasPossiveis
        )
    };

}

function verificarSePodePosicionar(
    matriz,
    palavra,
    linhaInicial,
    colunaInicial,
    movimentoLinha,
    movimentoColuna
) {

    for (
        let indice = 0;
        indice < palavra.length;
        indice++
    ) {

        const linha =
            linhaInicial +
            indice * movimentoLinha;

        const coluna =
            colunaInicial +
            indice * movimentoColuna;

        const letraExistente =
            matriz[linha][coluna];

        const novaLetra =
            palavra[indice];

        const posicaoEstaVazia =
            letraExistente === "";

        const letrasSaoIguais =
            letraExistente === novaLetra;

        if (
            !posicaoEstaVazia &&
            !letrasSaoIguais
        ) {

            return false;

        }

    }

    return true;

}

function escreverPalavraNaMatriz(
    matriz,
    palavra,
    linhaInicial,
    colunaInicial,
    movimentoLinha,
    movimentoColuna
) {

    for (
        let indice = 0;
        indice < palavra.length;
        indice++
    ) {

        const linha =
            linhaInicial +
            indice * movimentoLinha;

        const coluna =
            colunaInicial +
            indice * movimentoColuna;

        matriz[linha][coluna] =
            palavra[indice];

    }

}


function preencherEspacosVazios(matriz) {

    const letras =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (
        let linha = 0;
        linha < TAMANHO_TABULEIRO;
        linha++
    ) {

        for (
            let coluna = 0;
            coluna < TAMANHO_TABULEIRO;
            coluna++
        ) {

            if (
                matriz[linha][coluna] === ""
            ) {

                const indiceAleatorio =
                    gerarNumeroAleatorio(
                        letras.length
                    );

                matriz[linha][coluna] =
                    letras[indiceAleatorio];

            }

        }

    }

}

function posicionarVariasPalavras(
    matriz,
    palavras
) {

    const posicoesDasPalavras = [];

    for (const palavra of palavras) {

        const posicao =
            posicionarPalavraAleatoria(
                matriz,
                palavra
            );

        if (posicao !== null) {

            posicoesDasPalavras.push(
                posicao
            );

        }

    }

    return posicoesDasPalavras;

}