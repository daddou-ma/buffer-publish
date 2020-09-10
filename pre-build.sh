#!/bin/bash
set -e # fail bash script on any error below

# This code extracts the current git commit hash from the repository
# so that we can drop it into a file for the app to read later.
# (There's an environment variable already defined in Jenkins with
# the hash, but this `pre-build.sh` script is run inside of a Docker
# container so we have to be a little creative.)
GIT_COMMIT=`cat ./.git/HEAD`
GIT_AUTHOR=`git log -1 --pretty=format:'%an'`
cat << EOF > ./version.json
{"version": "$GIT_COMMIT", "author":"$GIT_AUTHOR"}
EOF
echo "version.json:"
cat ./version.json

# Notify Bugsnag of new release
echo "Notifying new version to Bugsnag"
cd /src/packages/server/scripts && yarn install --frozen-lockfile --non-interactive
node /src/packages/server/scripts/bugsnag-release.js