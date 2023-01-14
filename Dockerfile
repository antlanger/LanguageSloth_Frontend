FROM node:16.13.1

EXPOSE 19006
EXPOSE 19001
EXPOSE 19002

ENV EXPO_DEVTOOLS_LISTEN_ADDRESS="0.0.0.0"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

CMD ["npm", "run", "web"]