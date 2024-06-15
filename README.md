# quiz-project

Quiz application

[Link to app](http://113.30.149.109:3000/)

### Before starting application locally: 

- make sure docker is installed on your machine
- please check that ports 3000 and 5432 are not used

### To start application locally:

```
cd ./quiz-app-infra
docker-compose up -d
```

Then open browser on http://localhost:3000

## BACKEND

### To run backend application locally:

#### NOTE: Database should be up and running!

From project root:
```
cd ./quiz-app-api
npm ci
npm run migrate
npm run dev

```

Then open browser on http://localhost:3001

RESTFUL API documentation on http://localhost:3001/docs

### To run backend integration tests:

#### Locally (MacOS):

From project root:
```
cd ./quiz-app-api/
npm ci
npm run test:integration
```

#### In Docker container:

From project root:

MacOS | Windows
```
cd ./quiz-app-api/tests/integration
chmod u+x start_integration_tests_docker.sh
./start_integration_tests_docker.sh
```

Linux
```
cd ./quiz-app-api/tests/integration
chmod u+x start_integration_tests_docker.sh
start_integration_tests_docker.sh
```

### To run backend unit tests:

#### Locally (MacOS/Windows/Linux):

##### NOTE - You need Node.js (v18.13.0) and npm (8.19.3) installed on your machine

##### !!!!! Before running unit tests you need to remove folder quiz-app-api/dist

From project root:
```
cd ./quiz-app-api/
npm ci
npm run test:unit
```

_____

## FRONTEND
### To run frontend unit tests:
From project root:
```
cd ./quiz-app-webapp/
npm ci
npm run test:unit
```

### To run frontend e2e tests:
From project root:
```
cd ./quiz-app-webapp/
npm ci
npm start or npm run start:dev
npm run test:e2e
```

In opened window select `E2E Testing`, after `Choose a browser`.

Select e2e-test from list you like to test.
