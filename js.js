const faixasDeNivel = [
    { maximo: 999, nivel: "Ferro" },
    { maximo: 2000, nivel: "Bronze" },
    { maximo: 5000, nivel: "Prata" },
    { maximo: 7000, nivel: "Ouro" },
    { maximo: 8000, nivel: "Platina" },
    { maximo: 9000, nivel: "Ascendente" },
    { maximo: 10000, nivel: "Imortal" },
    { maximo: Infinity, nivel: "Radiante" }
];

const formulario = document.querySelector("#classifier-form");
const campoNome = document.querySelector("#hero-name");
const campoXp = document.querySelector("#hero-xp");
const mensagem = document.querySelector("#form-message");
const resultado = document.querySelector("#result");
const textoResultado = document.querySelector("#result-copy");
const trofeu = document.querySelector("#trophy");
const listaRanking = document.querySelector("#ranking-list");
const rankingVazio = document.querySelector("#ranking-empty");
const mensagemArmazenamento = document.querySelector("#storage-message");

let ranking = carregarRanking();
renderizarRanking();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    mensagem.hidden = true;
    resultado.hidden = true;

    const nome = campoNome.value.trim();
    const xp = Number(campoXp.value);

    if (!nome) {
        mostrarErro("Informe o nome do herói.");
        campoNome.focus();
        return;
    }

    if (campoXp.value.trim() === "" || !Number.isFinite(xp) || !Number.isInteger(xp) || xp < 0) {
        mostrarErro("Informe uma quantidade de XP inteira e igual ou maior que zero.");
        campoXp.focus();
        return;
    }

    let nivel = "";
    for (const faixa of faixasDeNivel) {
        if (xp <= faixa.maximo) {
            nivel = faixa.nivel;
            break;
        }
    }

    mostrarResultado(nome, nivel);
    ranking.push({ nome, xp, nivel, criadoEm: Date.now() });
    salvarRanking();
    renderizarRanking();
});

function mostrarResultado(nome, nivel) {
    textoResultado.textContent = `O Herói de nome ${nome} está no nível de ${nivel}.`;

    const slugNivel = nivel.toLowerCase();
    trofeu.className = `trophy trophy-${slugNivel}`;
    trofeu.replaceChildren();

    for (const parte of ["cup", "stem", "base", "sparkle"]) {
        const elemento = document.createElement("span");
        elemento.className = `trophy-${parte}`;
        if (parte === "sparkle") {
            elemento.textContent = "★";
        }
        trofeu.append(elemento);
    }

    resultado.hidden = false;
}

function carregarRanking() {
    try {
        const dadosSalvos = localStorage.getItem("asas-do-norte-ranking");
        if (!dadosSalvos) {
            return [];
        }

        const dados = JSON.parse(dadosSalvos);
        const valido = Array.isArray(dados) && dados.every((heroi) =>
            heroi !== null &&
            typeof heroi.nome === "string" &&
            Number.isInteger(heroi.xp) &&
            heroi.xp >= 0 &&
            typeof heroi.nivel === "string" &&
            Number.isFinite(heroi.criadoEm)
        );

        if (!valido) {
            throw new Error("Os dados salvos não correspondem ao formato esperado.");
        }

        return dados;
    } catch (erro) {
        console.error("Não foi possível carregar o ranking salvo.", erro);
        mostrarErroArmazenamento("Não foi possível ler o ranking salvo. Um novo ranking será criado nesta sessão.");
        return [];
    }
}

function salvarRanking() {
    try {
        localStorage.setItem("asas-do-norte-ranking", JSON.stringify(ranking));
        mensagemArmazenamento.hidden = true;
    } catch (erro) {
        console.error("Não foi possível salvar o ranking.", erro);
        mostrarErroArmazenamento("O ranking está atualizado nesta página, mas o navegador não conseguiu salvá-lo.");
    }
}

function renderizarRanking() {
    listaRanking.replaceChildren();

    const heroisOrdenados = [...ranking].sort((a, b) => b.xp - a.xp || b.criadoEm - a.criadoEm);
    heroisOrdenados.forEach((heroi, indice) => {
        const item = document.createElement("li");
        item.className = `ranking-item ranking-${heroi.nivel.toLowerCase()}`;

        const posicao = document.createElement("span");
        posicao.className = "ranking-position";
        posicao.textContent = `#${indice + 1}`;

        const nomeNivel = document.createElement("span");
        nomeNivel.className = "ranking-hero";
        nomeNivel.textContent = heroi.nome;

        const nivel = document.createElement("span");
        nivel.className = "ranking-level";
        nivel.textContent = heroi.nivel;

        const experiencia = document.createElement("strong");
        experiencia.className = "ranking-xp";
        experiencia.textContent = `${heroi.xp.toLocaleString("pt-BR")} XP`;

        item.append(posicao, nomeNivel, nivel, experiencia);
        listaRanking.append(item);
    });

    rankingVazio.hidden = ranking.length > 0;
}

function mostrarErro(texto) {
    mensagem.textContent = texto;
    mensagem.hidden = false;
}

function mostrarErroArmazenamento(texto) {
    mensagemArmazenamento.textContent = texto;
    mensagemArmazenamento.hidden = false;
}
