#!bin/bash

cd ./frontend
npm install

cd ../backend
npm install

cd ..
docker-compose build