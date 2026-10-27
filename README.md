# Classificador de Nível de Herói

Projeto desenvolvido para o desafio **Classificador de Nível de Herói** da DIO. Informe o nome e a experiência (XP) do herói para descobrir seu nível e registrar a classificação no ranking local.

## Como executar

1. Baixe ou clone este repositório.
2. Abra `index.html` em um navegador.

Não é necessário instalar dependências nem configurar um servidor.

## Como usar

1. Digite o nome do herói.
2. Informe um valor de XP inteiro e igual ou maior que zero.
3. Selecione **Descobrir meu nível**.
4. Consulte o troféu animado e o ranking, ordenado da maior para a menor quantidade de XP.

O ranking é salvo no armazenamento local do navegador (`localStorage`). Ele fica disponível no mesmo navegador e dispositivo; não é compartilhado entre visitantes ou dispositivos.

## Faixas de nível

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

## Tecnologias e conceitos

- HTML, CSS e JavaScript puro
- Variáveis, operadores, laços de repetição e estruturas de decisão
- Validação de entrada e armazenamento local no navegador
- Interface responsiva com tema de jogo de plataforma retrô

## Estrutura

```text
index.html       Estrutura da página
style.css        Estilos e animações
js.js            Classificador, validação e ranking
README.md        Documentação do projeto
.vscode/         Configuração para abrir no Chrome pelo VS Code
```
