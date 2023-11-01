FROM nginx:1.25.1-alpine

WORKDIR /home

RUN apk update && \ 
    apk --update add g++ git gcc make zlib-dev linux-headers pcre-dev openssl-dev && \
    wget https://nginx.org/download/nginx-1.25.1.tar.gz && \
    tar -xzvf nginx-1.25.1.tar.gz && \
    cd nginx-1.25.1 && git clone https://github.com/Lax/traffic-accounting-nginx-module.git && \
    ./configure --prefix=/etc/nginx --with-compat --add-dynamic-module=traffic-accounting-nginx-module && \
    make && make install && \
    make modules

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]