#!/bin/bash
set -e # fail bash script on any error below

# Drop git hash for server to pick up
# as the `appVersion` to give to Bugsnag
GIT_COMMIT=`cat ./.git/HEAD`
GIT_AUTHOR=`git log -1 --pretty=format:'%an'`
cat << EOF > ./version.json
{"version": "$GIT_COMMIT", "author":"$GIT_AUTHOR"}
EOF

echo "VERSION JSON FILE:"
cat ./version.json

yarn install --non-interactive

# Notify Bugsnag of new release
yarn run bugsnag:release

# Build the bundle and it's assets (CSS, chunks, source maps)
yarn run build

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
