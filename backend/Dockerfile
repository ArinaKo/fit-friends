FROM node:20-alpine
WORKDIR /opt/fit-friends/backend
COPY ./dist .
COPY ./package.json .
RUN npm install --omit=dev
CMD ["node", "./main.js"]
