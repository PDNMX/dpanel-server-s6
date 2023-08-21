FROM node:18-alpine

MAINTAINER Mergio Rodríguez <sergio.rdzsg@gmail.com>

ADD . /dpanel_server_s6
WORKDIR /dpanel_server_s6

RUN npm install \
&& npm cache clean

EXPOSE ${PORT}

CMD ["yarn", "start"]
