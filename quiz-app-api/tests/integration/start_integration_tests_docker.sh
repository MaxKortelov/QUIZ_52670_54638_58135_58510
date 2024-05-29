#!/bin/bash

# variables

CONTAINER_DB=db-integration-tests
CONTAINER_BACKEND=backend-integration-tests
IMAGE_DB=integration_db
IMAGE_BACKEND=integration_backend-integration-tests
VOLUME=integration_quiz-test-volume

# start tests

docker-compose up --abort-on-container-exit

# after tests are finished clean up docker

docker container rm $CONTAINER_DB
docker container rm $CONTAINER_BACKEND

docker image rm $IMAGE_DB
docker image rm $IMAGE_BACKEND

docker volume rm $VOLUME
