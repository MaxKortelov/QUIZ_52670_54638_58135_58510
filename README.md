# aeh-team-project

Quiz application

### To start application locally:

```
cd ./quiz-app-infra
docker-compose up -d
```

Then open browser on http://localhost:3000


### Users to login:

```
email: moore_wall@bedder.abbott
password: pass

email: tamika_larsen@gorganic.kddi
password: pass
```

### To run backend application locally:

#### NOTE: Database should be up and running!

From project root:
```
cd ./quiz-app-api
npm i
npm run migrate
npm run dev

```

Then open browser on http://localhost:3001

RESTFUL API documentation on http://localhost:3001/docs
