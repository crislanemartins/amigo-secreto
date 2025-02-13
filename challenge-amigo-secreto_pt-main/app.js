// Array
let amigos = [];
let paresSorteados = [];

// Função para exibir uma mensagem de alerta
function exibirMensagem(mensagem) {
    alert(mensagem);
}

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    if (!nome) {
        exibirMensagem("Houston,, temos um problema! Insira um nome. 🚀 (Apollo 13)");
        return;
    }

    if (amigos.includes(nome)) {
        exibirMensagem("Esse nome já foi adicionado! Parece que temos um Déjà vu. 🔄 (Matrix)");
        return;
    }

    amigos.push(nome);
    atualizarListaAmigos();
    input.value = ""; 
    input.focus();
}

// Atualiza a lista de amigos na tela
function atualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = "";

    amigos.forEach((amigo) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });

    console.log("Hakuna Matata! A lista foi atualizada. 🦁 (O Rei Leão)");
}

// Função para embaralhar garantindo que ninguém tire a si mesmo
function prepararSorteio() {
    if (amigos.length < 2) {
        exibirMensagem("Você precisa de pelo menos 2 amigos! 'Que a força esteja com você'. ✨ (Star Wars)");
        return;
    }

    let sorteados;
    let tentativas = 0;
    const maxTentativas = 10;

    do {
        sorteados = [...amigos].sort(() => Math.random() - 0.5);
        tentativas++;
        if (tentativas >= maxTentativas) {
            exibirMensagem("Eu tentei, mas 'a sorte nunca esteve ao seu favor'. 🔥 (Jogos Vorazes)");
            return;
        }
    } while (sorteados.some((sorteado, i) => sorteado === amigos[i]));

    paresSorteados = amigos.map((amigo, i) => ({ amigo, sorteado: sorteados[i] }));

    console.log("Sorteio pronto! 'Ao infinito e além!' 🚀 (Toy Story)");
}

// Função para sortear um par por vez
function sortearAmigo() {
    if (amigos.length < 2) {
        exibirMensagem("Você precisa adicionar pelo menos 2 amigos. 'É perigoso ir sozinho!' ⚔️ (The Legend of Zelda)");
        return;
    }

    // Se o sorteio ainda não foi preparado, prepara os pares
    if (paresSorteados.length === 0) {
        prepararSorteio();
    }

    const ulResultado = document.getElementById('resultado');

    if (paresSorteados.length > 0) {
        const par = paresSorteados.shift();
        const li = document.createElement('li');
        li.textContent = `${par.amigo} tirou ${par.sorteado}`;
        ulResultado.appendChild(li);

        console.log(`'E o Oscar vai para...' 🎭 ${par.amigo} tirou ${par.sorteado}!`);

        if (paresSorteados.length === 0) {
            exibirMensagem("Todos os amigos já foram sorteados! 'Encerramos por hoje, pessoal!' 🎤 (Looney Tunes)");
        }
    }
}

// Evento para garantir que o sorteio será feito ao clicar no botão
document.querySelector('.button-draw').addEventListener('click', sortearAmigo);
