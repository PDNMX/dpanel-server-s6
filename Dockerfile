FROM node:18-alpine

MAINTAINER André Lopez <alopezr@sesna.gob.mx>

ADD . /dpanel_server_s6
WORKDIR /dpanel_server_s6

RUN npm install \
&& npm cache clean --force

EXPOSE ${PORT}

CMD ["yarn", "start"]
