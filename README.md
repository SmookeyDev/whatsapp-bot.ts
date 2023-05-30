<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="Bot logo"></a>
</p>


<div align="center">

[![Status](https://img.shields.io/badge/status-ativo-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/SmookeyDev/whatsapp-bot.ts.svg)](https://github.com/SmookeyDev/whatsapp-bot.ts/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/SmookeyDev/whatsapp-bot.ts.svg)](https://github.com/SmookeyDev/whatsapp-bot.ts/pulls)
</div>

---

## 📝 Tabela de conteúdos

- [Sobre](#about)
- [Comandos](#commands)
- [Requisitos para rodar ambiente de desenvolvimento](#developmentrequirements)
- [Instalação](#installation)

## 🧐 Sobre <a name="about"></a>
O whatsapp-bot.ts é um bot de whatsapp que tem como objetivo ser um bot de utilidades, com comandos que podem ser úteis para o usuário. O bot foi feito em TypeScript e utiliza a biblioteca [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) para se comunicar com o whatsapp.


## 📲 Comandos <a name="commands"></a>

| Comando  | Status |
| ------------- | ------------- |
| !help = Inicia o robô.  | ✅  |
| !sticker = Transforma uma imagem em um sticker.  | ✅  |

---

## 📝 Requisitos para rodar ambiente de desenvolvimento <a name="developmentrequirements"></a>

- Node.js
- Nodemon
- TypeScript
- Yarn

## 💭 Instalação <a name="installation"></a>

1.Clone este repositório usando o seguinte comando:
```terminal
$ git clone https://github.com/SmookeyDev/whatsapp-bot.ts
```
2.Acesse a pasta do projeto em seu terminal:
```terminal
$ cd whatsapp-bot.ts
```
3.Rode o comando de instalação das bibliotecas utilizada no projeto.
```terminal
$ yarn
```
4.Baixe o [ffmpeg](https://ffmpeg.org/download.html) para o seu sistema operacional, e coloque o arquivo baixado na pasta files.

5.Inicie o robô rodando os seguintes comando:
```terminal
$ yarn dev
```
