FROM node:18 as myapp-builder

COPY ./app /var/www/myapp

WORKDIR /var/www/myapp

RUN npm i && npm run build


FROM nginx:1.25.1-alpine

COPY --from=myapp-builder /var/www/myapp /usr/src/myapp
COPY ./app/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]