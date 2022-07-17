FROM node:16.14.0-slim

ADD package.json /tmp/package.json

ADD package-lock.json /tmp/package-lock.json

RUN rm -rf build

RUN cd /tmp && yarn install

ADD ./ /src

RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/

WORKDIR /src

RUN npm run build

CMD ["node", "build/src/app.js"]
