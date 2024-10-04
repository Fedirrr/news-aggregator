FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ../../../Desktop/для%20проекта .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
