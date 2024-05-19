FROM node:20.11.0

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install

COPY . /app/

RUN npm run build

RUN chmod +x run.sh

CMD ["sh", "run.sh"]