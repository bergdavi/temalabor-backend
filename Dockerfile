FROM node:10-alpine
USER root
RUN apk add --no-cache --virtual .build-deps g++ make python
RUN apk add openssh && echo "root:Docker!" | chpasswd
RUN mkdir -p /usr/node/app/node_modules
WORKDIR /usr/node/app
COPY sshd_config /etc/ssh/
COPY package*.json ./
RUN npm install
RUN apk del .build-deps
COPY . .
EXPOSE 3000 2222

CMD /usr/bin/ssh-keygen -A && /usr/sbin/sshd & npm start

