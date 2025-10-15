# 🛍️ AngularStore

Sistema completo de gerenciamento de produtos com .NET 8 Web API e Angular 20.

## 🏗️ Arquitetura

- **Backend**: .NET 8 Web API com DDD (Domain-Driven Design)
- **Frontend**: Angular 20 com design moderno e responsivo
- **Banco de Dados**: Entity Framework InMemory
- **Documentação**: Swagger/OpenAPI

## 📋 Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

```bash
npm install -g @angular/cli
```

## 🚀 Como Executar

### 1. Backend (.NET API)

```bash
# Navegar para o diretório da API conforme o exemplo abaixo

cd "C:\projetos\AngularStoreAPI\AngularStore.Api"

# Restaurar dependências
dotnet restore

# Executar a aplicação
dotnet run
```

**URLs do Backend:**

- API: https://localhost:7000
- Swagger: https://localhost:7000/swagger

### 2. Frontend (Angular)

```bash
# Navegar para o diretório do frontend
cd frontend

# Instalar dependências
npm install

# Executar a aplicação
ng serve
```

**URL do Frontend:**

- Aplicação: http://localhost:7085

## 🎯 Funcionalidades

- ✅ **CRUD Completo** de produtos
- ✅ **Validação** de dados no frontend e backend
- ✅ **Design Responsivo** para todos os dispositivos
- ✅ **Documentação API** com Swagger
- ✅ **Arquitetura DDD** com separação de responsabilidades
- ✅ **Tratamento de Erros** padronizado

## 📁 Estrutura do Projeto

```
AngularStore/
├── API/AngularStore.Api/          # Web API
├── Business/AngularStore.Application/  # Camada de Aplicação
├── Domain/AngularStore.Domain/    # Entidades de Domínio
├── Domain/AngularStore.Common/    # Classes Compartilhadas
├── Domain/AngularStore.Ioc/       # Injeção de Dependência
├── Repository/AngularStore.Repository/ # Acesso a Dados
├── Tests/AngularStore.Tests/      # Testes Unitários
└── frontend/                      # Aplicação Angular
```

## 🔧 Configurações

### Portas

- **Backend**: 7000 (HTTPS) / 5000 (HTTP)
- **Frontend**: 7085

### CORS

O backend está configurado para aceitar requisições do frontend nas portas 7085 e 4200.

## 📊 Dados de Exemplo

A aplicação já vem com produtos de exemplo:

- Notebook Dell - R$ 2.500,00
- Mouse Logitech - R$ 50,00

## 🛠️ Tecnologias Utilizadas

### Backend

- .NET 8
- Entity Framework Core
- Swagger/OpenAPI
- AutoMapper
- FluentValidation

### Frontend

- Angular 20
- TypeScript
- RxJS
- CSS Grid/Flexbox
- Google Fonts (Inter)

## 📱 Design Responsivo

O frontend foi desenvolvido com design mobile-first e é totalmente responsivo:

- 📱 **Mobile**: < 480px
- 📱 **Tablet**: 480px - 768px
- 💻 **Desktop**: > 768px

## 🎨 Paleta de Cores

- **Primária**: Gradiente roxo-azul (#667eea → #764ba2)
- **Sucesso**: Verde (#059669)
- **Perigo**: Vermelho (#ef4444)
- **Neutro**: Cinza (#6b7280)

## 📝 API Endpoints

| Método | Endpoint             | Descrição         |
| ------ | -------------------- | ----------------- |
| GET    | `/api/products`      | Listar produtos   |
| GET    | `/api/products/{id}` | Obter produto     |
| POST   | `/api/products`      | Criar produto     |
| PUT    | `/api/products/{id}` | Atualizar produto |
| DELETE | `/api/products/{id}` | Excluir produto   |

## 🧪 Executar Testes

```bash
cd "Tests/AngularStore.Tests"
dotnet test
```
