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

### To run integration tests:

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
