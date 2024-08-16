# Fincheck

Fincheck is a personal finance control app which provides the user an easy way to see, register and organize his expenses, incomes and investments, this app was developed using TypeScript and Nest.js

## Demostration

<img  src="https://github.com/engelzz/Fincheck/blob/develop/frontend/src/assets/1722537168106.jpeg" title="JavaScript"  alt="JavaScript"  width="600"  height="400"/>&nbsp;


## API docs

#### All the get routes require the same params

```http
  GET /api/transactions
```

| Params | Type       | Descrption                           |
| :---------- | :--------- | :---------------------------------- |
| `jwtToken` | `string` | **Requires**. API key |
| `userId` | `string: UUID` | **Requires**. Saved on token payload |

## Environment Variables

To be able to use this project you have to set your JWTSECRET key into your .env file, that key is to provide integritie and security for you authentication token

`API_KEY = JWTSCRET`
    
## Author

- [@engeldev](https://www.github.com/engelzz)


## Stack 

**Front-end:** React, TypeScript, TailwindCSS

**Back-end:** Node, NestJS, Prisma

**Mobile:** React Native, Axios

