# Desafios de Herói | DIO

Este projeto reúne **três desafios da DIO em uma única aplicação web**. Abra `index.html` e use as abas do cabeçalho para alternar entre os classificadores por XP, partidas rankeadas e classes de herói. Cada desafio tem seu próprio formulário e resultado.

## Como executar

1. Clone ou baixe este repositório.
2. Abra `index.html` em um navegador.

Não é necessário instalar dependências nem configurar um servidor.

## 1. Classificador de Nível de Herói

Informe o nome do herói e uma quantidade inteira de XP igual ou maior que zero. A aplicação mostra o nível alcançado e registra o herói no ranking local, ordenado da maior para a menor quantidade de XP.

| Experiência (XP) | Nível |
| --- | --- |
| Até 999 | Ferro |
| 1.000 a 2.000 | Bronze |
| 2.001 a 5.000 | Prata |
| 5.001 a 7.000 | Ouro |
| 7.001 a 8.000 | Platina |
| 8.001 a 9.000 | Ascendente |
| 9.001 a 10.000 | Imortal |
| 10.001 ou mais | Radiante |

## 2. Calculadora de partidas Rankeadas

Informe o nome do herói e quantidades inteiras de vitórias e derrotas, iguais ou maiores que zero. O saldo é calculado pela fórmula `vitórias - derrotas`, e o nível é definido pela quantidade de vitórias. O resultado aparece na página e a classificação entra no ranking ordenado pelo saldo.

| Vitórias | Nível |
| --- | --- |
| Até 10 | Ferro |
| 11 a 20 | Bronze |
| 21 a 50 | Prata |
| 51 a 80 | Ouro |
| 81 a 90 | Diamante |
| 91 a 100 | Lendário |
| 101 ou mais | Imortal |

O enunciado não define o nível para exatamente 10 vitórias; neste projeto, 10 vitórias são classificadas como **Ferro**.

## 3. Escrevendo as classes de um Jogo

Crie um herói informando nome, idade e tipo. O projeto instancia um objeto da classe `Heroi`; seu método `atacar()` escolhe a mensagem de ataque conforme o tipo:

| Tipo | Ataque |
| --- | --- |
| Mago | Magia |
| Guerreiro | Espada |
| Monge | Artes marciais |
| Ninja | Shuriken |

Por exemplo, um mago exibe **“o mago atacou usando magia”**. A idade deve ser um número inteiro igual ou maior que zero.

## Rankings e armazenamento

Os rankings de XP e de partidas são independentes e salvos no `localStorage` do navegador. Os dados permanecem disponíveis no mesmo navegador e dispositivo, sem sincronização entre dispositivos. O desafio de classes cria o personagem e exibe seu ataque; ele não adiciona personagens a esses rankings.

## Tecnologias e conceitos

- HTML, CSS e JavaScript puro
- Variáveis, operadores, funções, laços de repetição e estruturas condicionais
- Classes e objetos
- Validação de entrada e manipulação do DOM
- Armazenamento local com `localStorage`
- Interface responsiva, navegação por abas acessível e animações

## Arquivos do projeto

| Arquivo | Finalidade |
| --- | --- |
| `index.html` | Estrutura da página, abas e formulários dos desafios |
| `style.css` | Estilos responsivos e animações |
| `js.js` | Classificadores, classe `Heroi`, validação e rankings |
| `README.md` | Documentação e instruções |
