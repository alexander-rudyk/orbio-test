FROM node:20-alpine

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
# copy source code to /app/src folder
COPY . /app

# check files list
RUN ls -a
# install dependency
RUN npm install

RUN npm run build

EXPOSE $PORT

RUN chmod +x ./docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
