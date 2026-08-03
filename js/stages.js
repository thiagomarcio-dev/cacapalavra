const CONFIGURACAO_ESTAGIOS = [

    {
        numero: 1,
        quantidadePalavras: 1,
        dificuldade: "facil"
    },

    {
        numero: 2,
        quantidadePalavras: 1,
        dificuldade: "facil"
    },

    {
        numero: 3,
        quantidadePalavras: 2,
        dificuldade: "media"
    },

    {
        numero: 4,
        quantidadePalavras: 3,
        dificuldade: "media"
    },

    {
        numero: 5,
        quantidadePalavras: 5,
        dificuldade: "dificil"
    }

];

function obterConfiguracaoEstagio(numeroEstagio) {

    return CONFIGURACAO_ESTAGIOS.find(
        configuracao =>
            configuracao.numero === numeroEstagio
    );

}


function ehUltimoEstagio(numeroEstagio) {

    return numeroEstagio === CONFIGURACAO_ESTAGIOS.length;

}