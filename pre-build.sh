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

yarn run build

# Using alpha release of uploader to always upload map files
UPLOADER="https://github.com/bufferapp/buffer-static-upload/releases/download/0.2.2-alpha/buffer-static-upload-`uname -s`"
curl -L $UPLOADER > ./buffer-static-upload
chmod +x ./buffer-static-upload

FILES="vendor.js,bundle.js,bundle.css,*.map"
./buffer-static-upload -files "$FILES" -bucket static.buffer.com -dir publish

echo "STATIC ASSETS:"
cat ./staticAssets.json
