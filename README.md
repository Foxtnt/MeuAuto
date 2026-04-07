# MeuAuto - Sistema de Controle de Manutencoes

<div align="center">

<img src="https://media.giphy.com/media/3ov9k1J6jahVhiev0Q/giphy.gif" width="300"/>

### Aplicacao web para registrar, pesquisar e acompanhar manutencoes do seu carro

</div>

---

## Sobre o projeto

O **MeuAuto** é um projeto full-stack desenvolvido em **React + Vite** (frontend) com **JSON Server** (backend/API) para facilitar o acompanhamento de manutenções automotivas.

A aplicação permite:

- registrar manutenções;
- visualizar histórico de revisões;
- pesquisar por marca, modelo ou tipo de serviço;
- calcular consumo de combustível com histórico local.

> Ideal para estudo de React, consumo de API REST, formulários com validação, organização por componentes e integração frontend-backend.

---

## 📁 Estrutura do Projeto

```bash
projeto-MeuAuto/
├── datacar/                 # Backend - API JSON Server
│   ├── db.json             # Base de dados com revisoes
│   ├── package.json
│   └── node_modules/
│
├── meuAuto/                # Frontend - React + Vite
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── imgs/               # Screenshots da aplicacao
│
└── README.md              # Este arquivo
```

---

## Preview do projeto

Imagens reais da aplicação (pasta `meuAuto/imgs`):

### Tela de login
<img src="meuAuto/imgs/Screenshot_1.jpg" width="900"/>

### Tela principal (histórico de revisões)
<img src="meuAuto/imgs/Screenshot_2.jpg" width="900"/>

### Registrar manutenção
<img src="meuAuto/imgs/Screenshot_4.jpg" width="900"/>

### Pesquisa de manutenções
<img src="meuAuto/imgs/Screenshot_3.jpg" width="900"/>

### Calculadora de consumo
<img src="meuAuto/imgs/Screenshot_5.jpg" width="900"/>

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn

### 1️⃣ Instalar Dependências

#### Backend (datacar)
```bash
cd datacar
npm install
```

#### Frontend (meuAuto)
```bash
cd meuAuto
npm install
```

### 2️⃣ Executar a API (DataCar)

A pasta **datacar** contém um servidor JSON Server que fornece os dados das revisões via API REST.

```bash
cd datacar
npm start
```

Ou, se estiver usando json-server diretamente:
```bash
json-server --watch db.json 
```

A API estará disponível em: **http://localhost:3000**

**Endpoints disponíveis:**
- `GET /revisoes` - Lista todas as revisões cadastradas
- `GET /revisoes/:id` - Obtém uma revisão específica
- `POST /revisoes` - Cria uma nova revisão
- `PUT /revisoes/:id` - Atualiza uma revisão
- `DELETE /revisoes/:id` - Remove uma revisão

### 3️⃣ Executar a Aplicação (MeuAuto)

Em outro terminal, execute:

```bash
cd meuAuto
npm run dev
```

A aplicação estará disponível em: **http://localhost:5173** (padrão do Vite)

---

## 📊 Base de Dados (datacar)

O arquivo `datacar/db.json` contém a estrutura de dados com as manutenções:

```json
{
  "revisoes": [
    {
      "id": "1",
      "marca": "Volkswagen",
      "modelo": "Gol",
      "ano": "2014",
      "tipo": "suspensao",
      "data": "18/11/2025",
      "descritivo": [],
      "local": []
    }
  ]
}
```

**Campos principais:**
- `id` - Identificador único
- `marca` - Marca do veículo
- `modelo` - Modelo do veículo
- `ano` - Ano de fabricação
- `tipo` - Tipo de manutenção (óleo, suspensão, etc)
- `data` - Data da manutenção
- `descritivo` - Descrição da manutenção realizada
- `local` - Local onde foi realizada

---

## 🔧 Funcionalidades

✅ Cadastro de manutenções com formulário validado  
✅ Listagem de revisões consumindo API (`/revisoes`)  
✅ Pesquisa por marca, modelo e tipo  
✅ Remoção de revisões com confirmação  
✅ Comentários em revisões via modal  
✅ Notificação de manutenção a cada 6 meses  
✅ Calculadora de consumo (km/l) com histórico no `localStorage`

---

## 💻 Tecnologias utilizadas

### Frontend
![react](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![vite](https://img.shields.io/badge/Vite-build-purple?style=for-the-badge&logo=vite)
![react-router](https://img.shields.io/badge/React_Router-Rotas-red?style=for-the-badge&logo=reactrouter)
![react-hook-form](https://img.shields.io/badge/React_Hook_Form-Validacoes-pink?style=for-the-badge&logo=reacthookform)
![sweetalert2](https://img.shields.io/badge/SweetAlert2-Alertas-success?style=for-the-badge)
![javascript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)

### Backend
![json-server](https://img.shields.io/badge/JSON_Server-API-green?style=for-the-badge)

---

## 📂 Estrutura de Pastas - Frontend

```bash
meuAuto/src
├── componentes/
│   ├── Cardrevisao.jsx      # Componente de card de revisão
│   ├── Cardrevisao.css
│   ├── Titulo.jsx           # Componente de título
│   └── Titulo.css
├── App.jsx                  # Componente principal
├── App.css
├── Mainpage.jsx             # Página inicial
├── Mainpage.css
├── RegistrarManutencao.jsx  # Formulário de cadastro
├── RegistrarManutencao.css
├── Pesquisa.jsx             # Página de pesquisa
├── Pesquisa.css
├── Calculadora.jsx          # Calculadora de consumo
├── Calculadora.css
└── main.jsx                 # Ponto de entrada
```

---

## ⚙️ Scripts Disponíveis

### Frontend (meuAuto)
```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Faz build para produção
npm run preview  # Visualiza o build de produção
npm run lint     # Executa linter
```

### Backend (datacar)
```bash
npm start        # Inicia o JSON Server
```

---

## 🎓 O que é JSON Server?

**JSON Server** é um servidor Node.js que oferece uma API REST completa baseada em um arquivo JSON. Perfeito para:

- Prototipagem rápida
- Teste de aplicações frontend
- Desenvolvimento local sem banco de dados complexo
- Simular uma API REST de verdade

Documentação: [JSON Server](https://github.com/typicode/json-server)

---

## 📝 Notas de Desenvolvimento

- A aplicação consome a API em `http://localhost:3000/revisoes`
- Certifique-se de que o servidor JSON está rodando antes de iniciar a aplicação
- Os dados são persistidos no arquivo `datacar/db.json`
- O histórico da calculadora é salvo no `localStorage` do navegador

---

## 👨‍💻 Autores

**Bruno P. Corrêa da Silva** - 
<a href="https://github.com/Foxtnt"><img src="https://github.com/Foxtnt.png" width="45" height="45" alt="Foto de perfil do GitHub de Bruno P. Corrêa da Silva"></a>

**Lucas Cunha Rocha** - 
<a href="https://github.com/lucasrochaexe"><img src="https://github.com/lucasrochaexe.png" width="45" height="45" alt="Foto de perfil do GitHub de Lucas Cunha Rocha"></a>

 Projeto desenvolvido para fins educacionais

---

## 📄 Licença

Este projeto é livre para uso educacional e pessoal.
