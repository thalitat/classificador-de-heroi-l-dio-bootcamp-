const formularioXp = document.querySelector("#classifier-form");
const campoNomeXp = document.querySelector("#hero-name");
const campoXp = document.querySelector("#hero-xp");
const mensagemXp = document.querySelector("#form-message");
const resultadoXp = document.querySelector("#result");
const textoResultadoXp = document.querySelector("#result-copy");
const trofeuXp = document.querySelector("#trophy");
const listaRankingXp = document.querySelector("#ranking-list");
const rankingVazioXp = document.querySelector("#ranking-empty");
const mensagemArmazenamentoXp = document.querySelector("#storage-message");

const formularioRank = document.querySelector("#ranked-form");
const campoNomeRank = document.querySelector("#ranked-hero-name");
const campoVitorias = document.querySelector("#hero-wins");
const campoDerrotas = document.querySelector("#hero-losses");
const mensagemRank = document.querySelector("#ranked-form-message");
const resultadoRank = document.querySelector("#ranked-result");
const textoResultadoRank = document.querySelector("#ranked-result-copy");
const trofeuRank = document.querySelector("#ranked-trophy");
const listaRankingRank = document.querySelector("#ranked-ranking-list");
const rankingVazioRank = document.querySelector("#ranked-ranking-empty");
const mensagemArmazenamentoRank = document.querySelector("#ranked-storage-message");

let rankingXp = carregarRankingXp();
let rankingRank = carregarRankingRank();
renderizarRankingXp();
renderizarRankingRank();

formularioXp.addEventListener("submit", (evento) => {
    evento.preventDefault();
    mensagemXp.hidden = true;
    resultadoXp.hidden = true;

    const nome = campoNomeXp.value.trim();
    const xp = Number(campoXp.value);

    if (!nome) {
        mostrarErro(mensagemXp, "Informe o nome do herói.");
        campoNomeXp.focus();
        return;
    }

    if (campoXp.value.trim() === "" || !Number.isFinite(xp) || !Number.isInteger(xp) || xp < 0) {
        mostrarErro(mensagemXp, "Informe uma quantidade de XP inteira e igual ou maior que zero.");
        campoXp.focus();
        return;
    }

    const nivel = calcularNivelXp(xp);
    mostrarResultado(textoResultadoXp, resultadoXp, trofeuXp, `O Herói de nome ${nome} está no nível de ${nivel}.`, nivel);
    rankingXp.push({ nome, xp, nivel, criadoEm: Date.now() });
    salvarRanking("asas-do-norte-ranking", rankingXp, mensagemArmazenamentoXp);
    renderizarRankingXp();
});

formularioRank.addEventListener("submit", (evento) => {
    evento.preventDefault();
    mensagemRank.hidden = true;
    resultadoRank.hidden = true;

    const nome = campoNomeRank.value.trim();
    const vitorias = Number(campoVitorias.value);
    const derrotas = Number(campoDerrotas.value);

    if (!nome) {
        mostrarErro(mensagemRank, "Informe o nome do herói.");
        campoNomeRank.focus();
        return;
    }

    if (campoVitorias.value.trim() === "" || !Number.isInteger(vitorias) || vitorias < 0) {
        mostrarErro(mensagemRank, "Informe uma quantidade de vitórias inteira e igual ou maior que zero.");
        campoVitorias.focus();
        return;
    }

    if (campoDerrotas.value.trim() === "" || !Number.isInteger(derrotas) || derrotas < 0) {
        mostrarErro(mensagemRank, "Informe uma quantidade de derrotas inteira e igual ou maior que zero.");
        campoDerrotas.focus();
        return;
    }

    const saldoVitorias = vitorias - derrotas;
    const nivel = calcularNivelRank(vitorias);
    mostrarResultado(
        textoResultadoRank,
        resultadoRank,
        trofeuRank,
        `O Herói tem de saldo de ${saldoVitorias} está no nível de ${nivel}.`,
        nivel
    );
    rankingRank.push({ nome, vitorias, derrotas, saldoVitorias, nivel, criadoEm: Date.now() });
    salvarRanking("asas-do-norte-ranked-matches", rankingRank, mensagemArmazenamentoRank);
    renderizarRankingRank();
});

document.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener("click", () => ativarAba(tab));
    tab.addEventListener("keydown", (evento) => {
        const abas = [...document.querySelectorAll('[role="tab"]')];
        const indice = abas.indexOf(tab);
        let proximoIndice = indice;

        if (evento.key === "ArrowRight") {
            proximoIndice = (indice + 1) % abas.length;
        } else if (evento.key === "ArrowLeft") {
            proximoIndice = (indice - 1 + abas.length) % abas.length;
        } else if (evento.key === "Home") {
            proximoIndice = 0;
        } else if (evento.key === "End") {
            proximoIndice = abas.length - 1;
        } else {
            return;
        }

        evento.preventDefault();
        ativarAba(abas[proximoIndice]);
    });
});

function ativarAba(abaAtiva) {
    document.querySelectorAll('[role="tab"]').forEach((aba) => {
        const selecionada = aba === abaAtiva;
        aba.setAttribute("aria-selected", String(selecionada));
        aba.tabIndex = selecionada ? 0 : -1;
        document.querySelector(`#${aba.getAttribute("aria-controls")}`).hidden = !selecionada;
    });
}

function calcularNivelXp(xp) {
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

    for (const faixa of faixasDeNivel) {
        if (xp <= faixa.maximo) {
            return faixa.nivel;
        }
    }
}

function calcularNivelRank(vitorias) {
    if (vitorias <= 10) {
        return "Ferro";
    }
    if (vitorias <= 20) {
        return "Bronze";
    }
    if (vitorias <= 50) {
        return "Prata";
    }
    if (vitorias <= 80) {
        return "Ouro";
    }
    if (vitorias <= 90) {
        return "Diamante";
    }
    if (vitorias <= 100) {
        return "Lendário";
    }
    return "Imortal";
}

function mostrarResultado(texto, container, trofeu, mensagem, nivel) {
    texto.textContent = mensagem;

    const slugNivel = nivel.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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

    container.hidden = false;
}

function carregarRankingXp() {
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
        console.error("Não foi possível carregar o ranking de XP salvo.", erro);
        mostrarErroArmazenamento(mensagemArmazenamentoXp, "Não foi possível ler o ranking de XP salvo. Um novo ranking será criado nesta sessão.");
        return [];
    }
}

function carregarRankingRank() {
    try {
        const dadosSalvos = localStorage.getItem("asas-do-norte-ranked-matches");
        if (!dadosSalvos) {
            return [];
        }

        const dados = JSON.parse(dadosSalvos);
        const valido = Array.isArray(dados) && dados.every((heroi) =>
            heroi !== null &&
            typeof heroi.nome === "string" &&
            Number.isInteger(heroi.vitorias) &&
            heroi.vitorias >= 0 &&
            Number.isInteger(heroi.derrotas) &&
            heroi.derrotas >= 0 &&
            heroi.saldoVitorias === heroi.vitorias - heroi.derrotas &&
            typeof heroi.nivel === "string" &&
            heroi.nivel === calcularNivelRank(heroi.vitorias) &&
            Number.isFinite(heroi.criadoEm)
        );

        if (!valido) {
            throw new Error("Os dados salvos não correspondem ao formato esperado.");
        }

        return dados;
    } catch (erro) {
        console.error("Não foi possível carregar o ranking de partidas salvo.", erro);
        mostrarErroArmazenamento(mensagemArmazenamentoRank, "Não foi possível ler o ranking de partidas salvo. Um novo ranking será criado nesta sessão.");
        return [];
    }
}

function salvarRanking(chave, dados, mensagem) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
        mensagem.hidden = true;
    } catch (erro) {
        console.error("Não foi possível salvar o ranking.", erro);
        mostrarErroArmazenamento(mensagem, "O ranking está atualizado nesta página, mas o navegador não conseguiu salvá-lo.");
    }
}

function renderizarRankingXp() {
    renderizarRanking(listaRankingXp, rankingVazioXp, [...rankingXp].sort((a, b) => b.xp - a.xp || b.criadoEm - a.criadoEm), (heroi) => {
        const xp = document.createElement("strong");
        xp.className = "ranking-score";
        xp.textContent = `${heroi.xp.toLocaleString("pt-BR")} XP`;
        return xp;
    });
}

function renderizarRankingRank() {
    renderizarRanking(
        listaRankingRank,
        rankingVazioRank,
        [...rankingRank].sort((a, b) =>
            b.saldoVitorias - a.saldoVitorias ||
            b.vitorias - a.vitorias ||
            b.criadoEm - a.criadoEm
        ),
        (heroi) => {
            const saldo = document.createElement("strong");
            saldo.className = "ranking-score";
            saldo.textContent = `${heroi.vitorias}V / ${heroi.derrotas}D · saldo ${heroi.saldoVitorias}`;
            return saldo;
        }
    );
}

function renderizarRanking(lista, mensagemVazio, herois, criarPontuacao) {
    lista.replaceChildren();

    herois.forEach((heroi, indice) => {
        const item = document.createElement("li");
        item.className = `ranking-item ranking-${heroi.nivel.toLowerCase()}`;

        const posicao = document.createElement("span");
        posicao.className = "ranking-position";
        posicao.textContent = `#${indice + 1}`;

        const nomeHeroi = document.createElement("span");
        nomeHeroi.className = "ranking-hero";
        nomeHeroi.textContent = heroi.nome;

        const nivel = document.createElement("span");
        nivel.className = "ranking-level";
        nivel.textContent = heroi.nivel;

        item.append(posicao, nomeHeroi, nivel, criarPontuacao(heroi));
        lista.append(item);
    });

    mensagemVazio.hidden = herois.length > 0;
}

function mostrarErro(elemento, texto) {
    elemento.textContent = texto;
    elemento.hidden = false;
}

function mostrarErroArmazenamento(elemento, texto) {
    elemento.textContent = texto;
    elemento.hidden = false;
}
