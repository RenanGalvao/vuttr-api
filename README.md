# VuttrAPI
Very Useful Tools To Remember API is the API made for the Bossabox back-end challenge using NodeJS.


## How to install
Run:
```sh
git clone git@github.com:RenanGalvao/vuttr-api.git
```

Enter the root directory, then use the package manager of your preference, [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/get-npm), to install vuttr-api:
```sh
cd vuttr-api

npm install
yarn install
```

Then go to keys directory and run:
```sh
cd keys

openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout private.pen -out public.pen
```


## Starting
```sh
npm run start
yarn start
```


## Creating a credential
Send a POST request to localhost:3000/first-time with these fields:
```json
{
  "name": "your name",
  "email": "your email",
  "password": "your password"
}
```


## Logging in, retrieving token
Send a POST request to localhost:3000/login with these fields:
```json
{
  "email": "your email",
  "password": "your password"
}
```

Your response (If your credentials are correct) will be something like this:
```json
{
  "auth": true,
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.e..."
}
```

Use this token in all subsequents requests as Bearer token, it expires in 1 hour.


## Simple usage
POST localhost:3000/tools
```json
{
  "title": "title",
  "link": "link",
  "description:": "description",
  "tags": ["tag1", "tag2"]
}
```


## API routes
```
POST /first-time -> Create a user for authentication purpose
POST /login -> ...
POST /delete-database/yes -> Deletes the current database (if you have forgotten your email and/or password)

GET /tools -> Returns all tools that are saved in the database
POST /tools -> Save a new tool in the database
PUT /tools:id -> Updates the tool indicated by the id in the database
DELETE /tools/:id -> Remove the tool indicated by the id in the database
```


## Testing
```sh
npm run test
yarn test
```

## License
[MIT](https://choosealicense.com/licenses/mit/)