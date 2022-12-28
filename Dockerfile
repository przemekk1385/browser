FROM node:lts-bullseye

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apt-get update && apt-get install -y chromium

WORKDIR /code
COPY ./ .

RUN yarn install

EXPOSE 3000

ENTRYPOINT ["node", "main.js"]
