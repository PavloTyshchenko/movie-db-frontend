# Movie DB Test Project React-Redux with NodeJS-MongoDB
"Without an example you will not learn anything"
Jan Amos Comenius

### Installation

1 - Clone repositories for front-end and back-end on your machine:

```sh
$ mkdir movie-db
$ cd movie-db
$ git clone https://github.com/
$ git clone https://github.com/
```

2 - Install dependencies via [npm](https://www.npmjs.com)
```sh
$ cd movie-db-frontend
$ npm install
$ cd ../movie-db-backend
$ npm install
```

3 - Run your [mongo](http://www.mongodb.org) database server
```sh
$ mongod
```

4 - Run the server
```sh
$ npm start
```

5 - Run the client dev server
```sh
$ cd ../movie-db-frontend
$ npm start
```

Hope you will see result on standard port after build:
Go to [http://localhost:3000/](http://localhost:3000/)

---
### Usage
When you first open the application the database should be empty. 

##### Start

Go to "Add" page and add your movies there. You can fill out
the form or, as an alternative import many movies at once from 
a respectively formatted file;

Below is an example of the correct formatting:

```
Title: Blazing Saddles
Release Year: 1974
Format: VHS
Stars: Mel Brooks, Clevon Little, Harvey Korman, Gene Wilder, Slim Pickens, Madeline Kahn

Title: Casablanca
Release Year: 1942
Format: DVD
Stars: Humphrey Bogart, Ingrid Bergman, Claude Rains, Peter Lorre
```

Also you can find such file in frontend folder.

---
### Architecture

##### General description

Technologies used:
  - React
  - Redux + Thunk - to manage data + orchestrate asynchronous actions.
  - React-router for routing.
  - NodeJS (ExpressJS) on backend to manage API.
  - MongoDB as simple database.

  Bootstrap - simple styling.

##### Structure

Front-end:
- actions:
    - movies.js.
- components
   - App - contains routes to pages.
   - ErrorBoundry - to bound components with error handling.
   - ErrorIndicator - presentation of Error.
   - Header - top menu with links to pages.
   - movie-components:
        - MovieDetails - displays detailed info.
        - MovieForm - to create new movies, edit or import.
        - MovieList - list with all movies, selecting for details.
    - pages:
        - MovieFormPage - structural, provide connection with Redux store and some logic.
        - MoviesPage - contains SearchPanel, MovieList and 
        MovieDetails.
    - Row - simple structural component to place two components in a row.
    - SearchPanel - provide searching by movie titles or actors.
    - Spinner - indicates loading processes.
- utils
  - fileParser.js - parses txt files to array of objects.
  - validator - validates user input.
- reducers:
    - movies.js
- store - redux store with some middleware.
- rootReducer.js
- store.js.
- index.js - root structure. Creating Redux store with middleware. 

Back-end:
- server.js - provides all API.
- validator.js - validates user input.
