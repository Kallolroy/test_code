#!/bin/sh

if [ $HOST_ENV == "stage" ] 
then 
    npm run start-stage
else 
    npm run start-dev
fi