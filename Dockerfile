
FROM node:16

WORKDIR /frontend

COPY frontend/package*.json /frontend/

RUN npm install

COPY frontend /frontend/

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
