FROM node:8

WORKDIR /code
COPY ./static/common/package.json /code/static/common/package.json
COPY ./static/common/package-lock.json /code/static/common/package-lock.json
RUN cd /code/static/common && npm install
COPY ./static /code/static
RUN cd /code/static/common && npm run build
COPY ./scripts/start-server.sh /code/scripts/start-server.sh
WORKDIR /code/static/common

EXPOSE 9000

#CMD ["/code/scripts/start-server.sh"]
CMD ["npm","run","serve"]