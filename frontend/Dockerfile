FROM node:20-alpine
WORKDIR /opt/fit-friends/frontend
COPY ./dist .
COPY ./package.json .
RUN npm install --omit=dev
RUN npm install -g vite
CMD ["npm", "start"]
