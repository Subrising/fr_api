FROM node:12.18.3

WORKDIR /usr/src/fr-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]