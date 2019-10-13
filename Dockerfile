FROM node:10-alpine
RUN apk add --no-cache --virtual .build-deps g++ make python
RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
RUN apk del .build-deps
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

