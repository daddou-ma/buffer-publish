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

# Build the bundle and it's assets (CSS, chunks, source maps)	node /src/packages/server/scripts/bugsnag-release.js 
yarn install --frozen-lockfile --non-interactive --production
BUGSNAG_APP_VERSION=$GIT_COMMIT yarn run build

echo "WEBPACK ASSETS:"	
cat ./webpackAssets.json	

# Upload the static assets to S3	
UPLOADER="https://github.com/bufferapp/buffer-static-upload/releases/download/0.3.0/buffer-static-upload-`uname -s`"	
curl -L $UPLOADER > ./buffer-static-upload	
chmod +x ./buffer-static-upload	

FILES="*.css,*.js,*.map"	
./buffer-static-upload -files "$FILES" -dir publish -skip-versioning	

echo "STATIC ASSETS:"	
cat ./staticAssets.json

# Notify Bugsnag of new release
echo "Notifying new version to Bugsnag"
cd /src/packages/server/scripts && yarn install --frozen-lockfile --non-interactive
node /src/packages/server/scripts/bugsnag-release.js