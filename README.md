<div align="center">
  <img height="160" src="https://imgur.com/oioEdFy.png"  />
</div>

# RetroReads
![Version 1.3.0](https://img.shields.io/badge/version-1.3.0-%23129357)

# Sumário 
1. [Sobre o Projeto](#sobre-o-projeto) 
2. [Funcionalidades](#funcionalidades) 
3. [Screenshots](#screenshots) 
4. [Tecnologias (Stacks)](#tecnologias) 
5. [Instalação](#como-usar) 
	- [Requisitos](#requisitos) 
	 - [Passos de instalação](#passos-de-instalação) 
	 - [Inicialização](#inicialização) 
7. [Licença](#licença)
8. [Autores](#autores)

## Sobre o Projeto
Sistema CSCO - Conexão Sebo-Consumidor Online é um sistema desenvolvido para conectar leitores, livrarias e sebos, facilitando a venda, compra e gerenciamento de livros de maneira eficiente e intuitiva. Este projeto tem como objetivo principal oferecer uma solução completa para problemas gerenciais de negócios, ao mesmo tempo em que auxilia usuários comuns a organizarem suas estantes de livros de forma prática e funcional.<br><br>O sistema abrange desde o gerenciamento de estoque e planejamento financeiro para livrarias e sebos, até funcionalidades que permitem aos leitores acompanhar suas leituras, fazer reservas de livros e explorar novas histórias. Dessa forma, o CSCO oferece uma plataforma robusta, acessível e de alta funcionalidade, atendendo às necessidades tanto de negócios de venda de livros quanto de leitores entusiastas.

Ao integrar diferentes tipos de usuários, o CSCO promove um ambiente colaborativo onde o gerenciamento de livros se torna mais simples, organizado e acessível, trazendo benefícios para toda a cadeia de valor do mercado de livros.

###
<div align="center">
  <img height="300" src="https://imgur.com/ZHmC31B.png"  />
</div>

## Funcionalidades

- **Login e Cadastro:** Os usuários podem se registrar e fazer login no sistema, garantindo que suas ações sejam realizadas em suas contas. Cada usuário tem acesso a uma página personalizada com seus próprios livros cadastrados.
- **CRUD para cadastro de livros**;

- **Catálogo dos livros (Home)**;

- **Página do produto (livro)**;

- **Sistema de Interesses:** interesse do usuário no produto que está à venda;

- **Minhas Vendas:** para acompanhar livros anunciados<br>- Autenticação JWT. O sistema é todo autenticado garantindo que apenas usuários cadastrados e com permissão possam acessar as funcionalidades que exigem uma autenticação, deixando o sistema seguro contra requisições mal intencionadas sem privilégios de acesso;

-  **Upload de imagens com multer**.

## Screenshots
Home (Catálogo), BookPage (página do produto) e Meus Interesses
<div align="center">
  <img src="./gifs-images/gif1.gif" alt="Demo GIF" height="360" />
</div>

-----------------

Login
<div align="center">
  <img src="./gifs-images/gif2.gif" alt="Demo GIF" height="360" />
</div>
## Tecnologias (Stacks)
<div align="left">
  <img src="https://skillicons.dev/icons?i=js" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=css" height="40" alt="css3 logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nodejs" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=react" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=mysql" height="40" alt="mysql logo"  />
</div>

**Frontend:** React, Axios  
**Backend:** Node.js, Express  
**Banco de Dados:** MySQL  
**Autenticação e Segurança:** Jsonwebtoken (JWT), bcryptjs (criptografia) para dados sensíveis.  
**Upload de Arquivos:** Lib Multer  
**Outras Dependências:** cors, path, router...

## Instalação
### Requisitos
| Database   | Recommended |
| ---------- | ----------- |
| MySQL      | 8.0         |

---

| Backend   | Recommended |
| ----------| -----------|
| Node.js   | LTS 18.x |


Estamos construindo um DOCKER para facilitar a instalação do projeto e a visualização do mesmo, mas enquanto não possuímos você necessitará da versão 8.0 em diante do MySQL e recomendamos a utilização do Node 18.x ou  superior.

------

### Passos de instalação
1. Clone o repositório:
	```bash
	git clone https://github.com/suNshiNexe/RetroReads.git
	```
2. Instale as dependências do frontend e backend.
	```bash
	cd RetroReads/backend
	npm install
	cd ../frontend
	npm install
	```  
3. Importe a base de dados para o seu banco de dados MySQL:

    Caminho:
    cd RetroReads/basededados
    Arquivo: retro_reads.sql

	Caso tenha dúvidas, consulte este site: [MySQL: Importando/Exportando um banco de dados](https://help.umbler.com/hc/pt-br/articles/202385865-MySQL-Importando-Exportando-um-banco-de-dados)

4. Configure o arquivo ``db.js``

    Caminho: ``RetroReads/backend/src/``
    
	Altere de acordo com a sua configuração
	```
	host: "localhost",
	user: "root",
	password: "root",
	port: 3306
	```

 ------
 
### Inicialização
1. Execute o backend
	```bash
	cd RetroReads/backend/src/client
	node server
	```
2. Execute o frontend (React)
	```bash
	cd RetroReads/frontend
	npm start
	```

## Licença
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

Este projeto está licenciado sob a Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).

Você é livre para:

- Compartilhar — copiar e redistribuir o material em qualquer meio ou formato
- Adaptar — remixar, transformar e criar a partir do material
Desde que siga as seguintes condições:

- Atribuição — Você deve dar o devido crédito, fornecer um link para a licença e indicar se foram feitas alterações.
- Uso Não Comercial — Você não pode usar o material para fins comerciais.
Para mais detalhes, consulte a licença completa.






## Autores
- [Lucas Quinália - Leader and Mobile Developer](https://www.github.com/#)
- [Stephanni Cavalcante - Frontend Developer](https://www.github.com/stephannica)
- [Yuri Viana - DevOps, Backend Developer](https://www.github.com/suNshiNexe)
- [Diego Basilio - Backend Developer](https://github.com/diegobasilio)
- [Matheus Souto - DBA](#)
- [Mauricio Stavarengo - Analyst](#)
- [Davi Silva - Software Tester](#)
