FROM node:latest as build
WORKDIR /frontend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest as nginx
COPY --from=0 /frontend/build ./frontend
COPY default.conf /etc/nginx/conf.d