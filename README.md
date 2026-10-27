# Classificador de Herói | Desafios DIO

Este projeto reúne **dois classificadores de herói em uma única aplicação web**. Abra `index.html` e use as abas do cabeçalho para alternar entre as experiências:

- **Classificador por XP:** informe o nome do herói e sua experiência para descobrir o nível alcançado.
- **Calculadora de partidas rankeadas:** informe vitórias e derrotas para calcular o saldo de vitórias e descobrir o nível competitivo.

Cada classificador possui seu próprio formulário, resultado e ranking. Assim, é possível usar os dois desafios na mesma página sem misturar os dados.

## Executar o projeto

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` em um navegador.

Não é necessário instalar dependências nem iniciar um servidor.

## Classificador por XP

Digite o nome do herói e uma quantidade inteira de XP igual ou maior que zero. A aplicação apresenta o nível correspondente e registra a classificação no ranking, ordenado da maior para a menor quantidade de XP.

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

## Calculadora de partidas rankeadas

Digite o nome do herói e informe valores inteiros, iguais ou maiores que zero, para vitórias e derrotas. O saldo é calculado subtraindo as derrotas das vitórias:

```text
saldo de vitórias = vitórias - derrotas
```

O nível depende da quantidade de vitórias. O resultado mostra o saldo e o nível, e a classificação é adicionada ao ranking ordenado pelo maior saldo.

| Vitórias | Nível |
| --- | --- |
| Até 10 | Ferro |
| 11 a 20 | Bronze |
| 21 a 50 | Prata |
| 51 a 80 | Ouro |
| 81 a 90 | Diamante |
| 91 a 100 | Lendário |
| 101 ou mais | Imortal |

O enunciado original não define a faixa para exatamente 10 vitórias; neste projeto, 10 vitórias são classificadas como **Ferro**.

## Rankings e armazenamento

Os rankings dos dois classificadores são independentes e ficam salvos no `localStorage` do navegador. Os dados permanecem disponíveis no mesmo navegador e dispositivo, mas não são sincronizados com outros dispositivos nem compartilhados entre visitantes.

## Tecnologias e conceitos

- HTML, CSS e JavaScript puro
- Variáveis, operadores, funções, laços de repetição e estruturas condicionais
- Validação de entradas e manipulação do DOM
- Armazenamento local com `localStorage`
- Interface responsiva, abas acessíveis e animações

## Arquivos do projeto

| Arquivo | Finalidade |
| --- | --- |
| `index.html` | Estrutura da página, formulários e abas |
| `style.css` | Estilos responsivos e animações |
| `js.js` | Cálculo dos níveis, validação e rankings |
| `README.md` | Documentação e instruções |
