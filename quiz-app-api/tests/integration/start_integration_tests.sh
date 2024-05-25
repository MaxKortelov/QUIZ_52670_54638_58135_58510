#!/bin/bash

dbUsername=postgres
dbPassword=postgres
dbContainerName=quiz-test
dbPort=9999
dbVolumeName=quiz-test-volume

#docker pull postgres:13
#
## running db in docker
#docker run -d \
#           --name $dbContainerName \
#           -p $dbPort:$dbPort \
#           -e POSTGRES_PASSWORD=$dbPassword \
#           -e POSTGRES_USER=$dbUsername \
#           -v $dbVolumeName:/data postgres:13

# set env variables for tests
export DB_USER=$dbUsername
export DB_HOST=localhost
export DB_NAME=$dbContainerName
export DB_PASSWORD=$dbPassword
export DB_PORT=$dbPort
#export NODE_ENV=test

# running tests
npx jest --testPathPattern=tests/integration


# after tests are finished clean up docker
#docker container stop $dbContainerName
#
#docker container rm $dbContainerName
#
#docker volume rm $dbVolumeName

#docker image rm postgres:13