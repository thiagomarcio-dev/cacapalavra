const PALAVRAS_FACEIS = [

    "JAVA",

    "SOL",

    "CASA",

    "GATO",

    "LUA",

    "FLOR",

    "BOLO",

    "AZUL",

    "RATO",

    "LIVRO"

];

const PALAVRAS_MEDIAS = [

    "TECLADO",
    "JANELA",
    "PLANETA",
    "ESCOLA",
    "OBJETO",
    "CADERNO",
    "CELULAR",
    "SISTEMA",
    "CODIGO",
    "MATRIZ"

];


const PALAVRAS_DIFICEIS = [

    "ALGORITMO",
    "PROGRAMACAO",
    "DESENVOLVER",
    "TECNOLOGIA",
    "JAVASCRIPT",
    "COMPUTADOR",
    "ESTRUTURA",
    "APLICACAO",
    "INTERFACE",
    "VARIAVEL"

];

function escolherPalavraAleatoria(listaDePalavras) {

    const indiceAleatorio = Math.floor(
        Math.random() * listaDePalavras.length
    );

    return listaDePalavras[indiceAleatorio];

}

function obterListaPorDificuldade(dificuldade) {

    if (dificuldade === "facil") {

        return PALAVRAS_FACEIS;

    }

    if (dificuldade === "media") {

        return PALAVRAS_MEDIAS;

    }

    if (dificuldade === "dificil") {

        return PALAVRAS_DIFICEIS;

    }

    return [];

}


function sortearPalavrasSemRepetir(
    listaDePalavras,
    quantidade
) {

    const copiaDaLista = [
        ...listaDePalavras
    ];

    const palavrasSorteadas = [];

    while (
        palavrasSorteadas.length < quantidade &&
        copiaDaLista.length > 0
    ) {

        const indiceAleatorio =
            Math.floor(
                Math.random() *
                copiaDaLista.length
            );

        const palavraSorteada =
            copiaDaLista.splice(
                indiceAleatorio,
                1
            )[0];

        palavrasSorteadas.push(
            palavraSorteada
        );

    }

    return palavrasSorteadas;

}


