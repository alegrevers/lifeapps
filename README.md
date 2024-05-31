## Inicialização

Para iniciar o app é necessário instalar as dependências em ambos repositórios com o comando: 
```
npm install \\ ou apenas yarn, se você possuir
```

Após a instalação bem sucedida é necessário o seguinte comando:
```
docker-compose up --build
```

Enfim, sua aplicação estará rodando e você terá acesso a duas rotas de api:

Para criar produtos no estoque:
```
POST - http://localhost:3001/api/inventory
```
Os parâmetros aceitos são:
```
{
    "quantity": number,
    "price": number
}
```

Para registrar uma ordem:
```
POST - [http://localhost:3001/api/inventory](http://localhost:3000/api/orders)
```
Os parâmetros aceitos são:
```
{
    "customer_id": "665a39287e90b7001dcb0453",
    "products": [{
        "_id": "665a4ac00c0e986a2ef90cfb",
        "quantity": 21,
        "price": 29.9
    }]
}
```

Para rodar os testes é necessário abrir um novo terminal e rodar o comando:
```
docker-compose run order-service npm run test
```
