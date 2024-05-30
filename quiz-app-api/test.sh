#!/bin/bash

npm run migrate

npx jest --testPathPattern=tests/integration --forceExit --coverage --coveragePathIgnorePatterns='types|fs|tests|@shared|utils|validators|services|auth|db|quiz'