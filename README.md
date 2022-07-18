# Rest-Api, Jest, Prometheus and Swagger Docs
`REST API Build with Node.js, Express, TypeScript, MongoDB &amp; Zod`

`Testing Express REST API With Jest & Supertest`

`Measure your ExpressJS API Performance with Prometheus`

`Automatically Generate Swagger Docs With ExpressJS & NodeJS`

![rest-api](https://user-images.githubusercontent.com/88436847/179627867-dc36f2ee-38d9-4ab5-a83d-90e7191bea25.png)

# Routes

`User Resource`
- Create User
- Create Session
- Get Sessions
- Delete Session

`Product Resource`
- Create Product
- Get Product
- Update Product
- Delete Product

`Metrics`
- Get metrics

# Usage

****Env Variables****

Create a .env file in the root and add the following

```
PRIVATE_KEY = your private jwt key
DB_CONNECTION = your mongodb uri
```

***Install Dependencies***

```
npm install
```

****Run****
```
# Run rest api(backend), swagger docs and metrics server
npm run dev
```

***Running tests***

It uses Jest & Supertest for Testing Express REST API

```
# Run rest-api tests only
npm run test
```

` Happy Coding :) `
