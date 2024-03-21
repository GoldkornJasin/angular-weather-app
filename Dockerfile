# docker run -v .:/app -p 4200:4200 -it noderunner bash
# docker build -t noderunner .
FROM node:lts-slim AS build

RUN npm install -g npm@10.2.4 && npm install -g @angular/cli && apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false update && apt install -y curl

WORKDIR /app

RUN npm install

RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist/TecCheck-Frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
