FROM node:16 AS client
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force
COPY ./ ./
ENV VITE_API_BASE_URL=\
    VITE_API_ORIGIN_URL=\
    VITE_API_S3_URL=
RUN npm run build

FROM nginx:latest
COPY --from=client usr/src/app/dist usr/share/nginx/html
COPY ./nginx/nginx.conf etc/nginx/nginx.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]