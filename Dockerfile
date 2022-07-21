FROM node:16 AS client
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force
COPY ./ ./
RUN npm run build
FROM nginx:latest
COPY --from=client /usr/src/app/dist usr/share/nginx/html
COPY --from=client /usr/src/app/config/default /etc/nginx/sites-available/default


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]