FROM nginx:1.25.1-alpine

WORKDIR /home

RUN apk update
RUN apk --update add g++ git gcc make zlib-dev linux-headers pcre-dev openssl-dev nano

RUN wget https://nginx.org/download/nginx-1.25.1.tar.gz
RUN tar -xzvf nginx-1.25.1.tar.gz
RUN cd nginx-1.25.1 && git clone https://github.com/Lax/traffic-accounting-nginx-module.git
RUN cd nginx-1.25.1 && ./configure --prefix=/etc/nginx --with-compat --add-dynamic-module=traffic-accounting-nginx-module 
RUN cd nginx-1.25.1 && make && make install
RUN cd nginx-1.25.1 && make modules

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]