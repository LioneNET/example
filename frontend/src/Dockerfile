FROM node:12
WORKDIR /usr/src/app
COPY package.json .
RUN npm install -g @vue/cli
RUN npm install
COPY . .