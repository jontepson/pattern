# pull official base image
FROM node:16.13.1

# install app dependencies

RUN apt-get update && apt-get install -y nodejs && apt-get install -y android-tools-adb


# set working directory
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install -g expo-cli && npm install
# add app
COPY . .

# start app
#CMD ls
#RUN yarn --network-timeout 100000
#CMD ["adb", "connect", "$ADB_IP", "&&", "expo", "start", "--android"]
#CMD ["adb", "connect", "192.168.56.1", "&&", "adb", "devices"]
#CMD adb -e shell
#CMD ["expo", "start", "--android"]
CMD expo start
#CMD curl localhost:1337
#CMD expo start --web