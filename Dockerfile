#FROM node:18.13.0

#ARG PORT=19006
#ENV PORT $PORT
#EXPOSE $PORT 19001 19002

#ENV EXPO_DEVTOOLS_LISTEN_ADDRESS="0.0.0.0"
#ENV REACT_NATIVE_PACKAGER_HOSTNAME="10.0.0.2"

#RUN mkdir -p /usr/src/app
#WORKDIR /usr/src/app

#COPY package.json /usr/src/app/package.json
#RUN npm install

#COPY . /usr/src/app

#CMD ["npm", "start"]
FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
COPY app.json /usr/src/app/

RUN npm install -g expo-cli

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD npm i -f && npm start