FROM node:13.13-alpine

WORKDIR /usr/src/app

#RUN apk update && \
#    npm install -g npm @vue/cli

COPY package.json .
COPY package-lock.json .
RUN npm install