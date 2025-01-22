// array
let amigos = [];
let paresSorteados = [];

// função para exibir uma mensagem de alerta de forma genérica
function exibirMensagem(mensagem) {
    alert(mensagem);
}

// função para adicionar um amigo à lista
function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    if (!nome) {
        exibirMensagem("Por favor, insira um nome."); // não, vazio não é nome. Tente de novo!
        return;
    }

    if (amigos.includes(nome)) {
        exibirMensagem("Este nome já foi adicionado."); // ei, você já adicionou esse amigo! (Ou tem um clone por aí?).
        return;
    }

    amigos.push(nome);
    atualizarListaAmigos();
    input.value = ""; // limpa o campo. Organização, meu caro!
    input.focus();
}

// atualiza a lista de amigos na tela
function atualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = "";

    amigos.forEach((amigo) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li); // adiciona amigo na lista ( mil anos depois )
    });
}

// função para embaralhar e garantir que ninguém tire a si mesmo
function prepararSorteio() {
    if (amigos.length < 2) {
        exibirMensagem("É necessário pelo menos 2 amigos para realizar o sorteio.");
        return;
    }

    let sorteados = [amigos].sort(() => Math.random() - 0.5); // Embaralha os amigos
    let tentativas = 0;
    

    while (tentativas < 10) { // limite de 10 tentativas para evitar loops infinitos
        const validacao = sorteados.every((amigo, index) => amigo !== amigos[index]);
        if (validacao) {
            break; // Se todos os pares forem válidos, sai do loop
        }
        sorteados = [amigos].sort(() => Math.random() - 0.5); // Tenta novamente embaralhar
        tentativas++;
    }

    if (tentativas === 10) {
        exibirMensagem("Não foi possível realizar o sorteio após várias tentativas.");
        return;
    }

    // cria os pares sorteados
    paresSorteados = amigos.map((amigo, i) => ({ amigo, sorteado: sorteados[i] }));
}

// função para sortear um par por vez
function sortearAmigo() {
    if (amigos.length < 2) {
        exibirMensagem("Você precisa adicionar pelo menos 2 amigos para fazer o sorteio.");
        return;
    }

    // se o sorteio ainda não foi preparado, prepara os pares
    if (paresSorteados.length === 0) {
        prepararSorteio(); // preparar o sorteio na primeira vez
    }

    const ulResultado = document.getElementById('resultado'); // lista de resultados

    if (paresSorteados.length > 0) {
        const par = paresSorteados.shift(); // remove o próximo par da lista
        const li = document.createElement('li');
        li.textContent = `${par.amigo} tirou ${par.sorteado}`; // exibe o sorteio
        ulResultado.appendChild(li);

        if (paresSorteados.length === 0) {
            exibirMensagem("Todos os amigos já foram sorteados!"); // fim do sorteio
        }
    }
}

// garante que o sorteio será feito ao clicar no botão de sortear
document.querySelector('.button-draw').addEventListener('click', function() {
    sortearAmigo(); // realiza o sorteio diretamente ao clicar
});
