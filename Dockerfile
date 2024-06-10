FROM node:18

WORKDIR /usr/app
COPY . .
RUN npm i -G nodemon
RUN npm install ts-node --save-dev
RUN npm install
RUN npm rebuild bcrypt --build-from-source 
EXPOSE 4000
CMD npm run start:dev
