#!bin/bash

npm install

cd ./frontend
npm install

cd ../backend
npm install

cd ..
docker-compose build