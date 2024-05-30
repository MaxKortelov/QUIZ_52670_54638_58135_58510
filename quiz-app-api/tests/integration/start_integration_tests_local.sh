#!/bin/bash

dbUsername=postgres
dbPassword=postgres
dbContainerName=quiz-test
dbPort=9999
dbVolumeName=quiz-test-volume

docker pull postgres:13

# running db in docker
docker run -d \
           --name $dbContainerName \
           -p $dbPort:5432 \
           -e POSTGRES_PASSWORD=$dbPassword \
           -e POSTGRES_USER=$dbUsername \
           -e POSTGRES_DB=$dbContainerName \
           -v $dbVolumeName:/data postgres:13

DB_CONTAINER=`docker ps|grep $dbContainerName |sed 's/\ .*//g'`
db_started=' database system is ready to accept connections'
echo "waiting for db to start..."
until docker logs  $DB_CONTAINER |grep "$db_started" ; do
  sleep 1s;
  DB_CONTAINER=`docker ps|grep $dbContainerName |sed 's/\ .*//g'`
done

# set env variables for tests
export DB_USER=$dbUsername
export DB_HOST=localhost
export DB_NAME=$dbContainerName
export DB_PASSWORD=$dbPassword
export DB_PORT=$dbPort
export TIME_PER_QUESTION=2
export ATTEMPTS_PER_QUIZ=10
export TZ="Factory"

# running tests
npm run migrate
npx jest --testPathPattern=tests/integration --forceExit --coverage --coveragePathIgnorePatterns='types|fs|tests|@shared|utils|validators|services|auth|db|quiz'

# after tests are finished clean up docker
docker container stop $dbContainerName

docker container rm $dbContainerName

docker volume rm $dbVolumeName

docker image rm postgres:13