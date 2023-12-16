FROM node:18

WORKDIR /app/src

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
