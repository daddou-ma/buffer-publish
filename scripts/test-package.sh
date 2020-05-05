if [[ $# -eq 0 ]] ; then
  echo
  echo 'Please pass the name of the package folder as the first argument.'
  echo
  exit 0
fi

# remove the ./ prefix, if present
path=${1#"./"}

echo "Starting test suite for ${path}"

yarn run jest \
  --watch \
  --verbose=false \
  --testPathPattern $path \
  --coverage \
  --collectCoverageFrom='["'"$path"'/**/*.jsx", "'"$path"'/**/*.js", "!'"$path"'/**/story.jsx"]' \
  -u
