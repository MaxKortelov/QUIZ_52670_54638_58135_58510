#!/bin/bash

npm run migrate

npx jest --testPathPattern=tests/integration --forceExit --coverage