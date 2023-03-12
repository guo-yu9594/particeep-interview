FROM node:alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY . .

RUN npm install
RUN npm run build
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]