#!/bin/bash
docker build -t bufferapp/publish-frontend:$GIT_COMMIT . -f nginx.Dockerfile --build-arg GIT_COMMIT=$GIT_COMMIT
docker push bufferapp/publish-frontend:$GIT_COMMIT