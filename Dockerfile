FROM node:14-alpine

ARG WORK_DIR=/var/www/node
RUN mkdir -p ${WORK_DIR}
COPY . ${WORK_DIR}/
WORKDIR ${WORK_DIR}

RUN apk update && apk upgrade && apk add --no-cache bash git
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm run build
RUN rm -fr node_modules
RUN rm -fr src
RUN pnpm install --production

ENTRYPOINT  ["npm", "run", "start:prod"]