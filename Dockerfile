FROM node:12 as deps

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm ci --only=prod

# This stage just builds the app to check it can be build without any errors
FROM deps

WORKDIR /usr/src/app

COPY . .

RUN npm install http-server-spa -g

EXPOSE 8088

CMD ["bash", "./docker-run.sh"]