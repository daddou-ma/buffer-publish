#!/bin/bash
set -e # fail bash script on any error below

# Drop git hash for server to pick up
# as the `appVersion` to give to Bugsnag
GIT_COMMIT=`cat ./.git/HEAD`
cat << EOF > ./version.json
{"version": "$GIT_COMMIT"}
EOF

echo "VERSION JSON FILE:"
cat ./version.json

yarn install --non-interactive
yarn run build

# Using alpha release of uploader to always upload map files
UPLOADER="https://github.com/bufferapp/buffer-static-upload/releases/download/0.2.2-alpha/buffer-static-upload-`uname -s`"
curl -L $UPLOADER > ./buffer-static-upload
chmod +x ./buffer-static-upload

FILES="vendor.js,vendor.js.map,bundle.js,bundle.js.map,bundle.css,bundle.css.map"
./buffer-static-upload -files "$FILES" -dir publish
