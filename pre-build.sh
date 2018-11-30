#!/bin/bash
set -e # fail bash script on any error below

echo "GITHASH"
cat ./.git/HEAD
cat /src/.git/HEAD

yarn install --non-interactive
yarn run build

UPLOADER="https://github.com/bufferapp/buffer-static-upload/releases/download/0.1.0/buffer-static-upload-`uname -s`"
curl -L $UPLOADER > ./buffer-static-upload
chmod +x ./buffer-static-upload

FILES="vendor.js,vendor.js.map,bundle.js,bundle.js.map,bundle.css,bundle.css.map"
./buffer-static-upload -files "$FILES" -dir publish
