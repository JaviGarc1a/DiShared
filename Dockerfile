FROM node:20.12-alpine

WORKDIR /dishared

COPY . .

COPY .env.deploy .env

RUN npm install
