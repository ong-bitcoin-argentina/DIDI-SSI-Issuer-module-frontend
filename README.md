# DIDI-SSI-Issuer-module

The issuer allows different entities authorized by didi-server to generate and emit certificates that can be accessed by their owners from didi. This module is made up of the issuer-front, a front-end developed in React, and the issuer-back, a backend developed in nodejs with a mongodb database. Where the information of certificate models and certificates to be issued is stored.

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 12.22.8

# Environment vars

This project uses the following environment variables:

| Name              | Default Value | Mandatory |
| ----------------- | :-----------: | :-------: |
| REACT_APP_API_URL |               |     ✔     |
| REACT_APP_VERSION |               |     ✔     |

# Getting started

- Install dependencies

```
npm install
```

- Build and run the project

```
npm run start
```

## Project Structure

```
┣📂.github
┣📂public
┗📂src
 ┣ 📂app
 ┃ ┣ 📂administrative
 ┃ ┣ 📂certificates
 ┃ ┣ 📂components
 ┃ ┣ 📂login
 ┃ ┣ 📂main
 ┃ ┣ 📂participants
 ┃ ┣ 📂presentations
 ┃ ┣ 📂profile
 ┃ ┣ 📂setting
 ┃ ┣ 📂templates
 ┃ ┣ 📂users
 ┃ ┗ 📂utils
 ┣ 📂constants
 ┣ 📂fonts
 ┣ 📂images
 ┣ 📂services
 ┣ 📂styles
 ┣ 📜index.js
```

## [Live Deploy](https://issuer.alpha.didi.org.ar/)

For more information, see the [documentation](https://docs.didi.org.ar/docs/developers/solucion/descripcion-tecnica/arquitectura-issuer)
