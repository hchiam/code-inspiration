function askForMaxDepth() {
  read -p "Enter max depth: " maxDepth
}

function installDotIfMissing() {
  if ! [ -x "$(command -v dot)" ]; then
    echo 'Error: dot graphviz is not set up or installed. Attempting install now.'
    brew install graphviz
  fi
}

function getSrcFolder() {
  read -p "Enter src folder: " srcFolder
}

function createDependencyGraph() {
  re='^[0-9]+$'
  if ! [[ $maxDepth =~ $re ]] ; then
    # don't use maxDepth if it's not a number
    depcruise --exclude "^node_modules" --output-type dot $srcFolder | dot -T svg > dependencygraph.svg
  else
    depcruise --max-depth $maxDepth --exclude "^node_modules" --output-type dot $srcFolder | dot -T svg > dependencygraph.svg
  fi
}

function showDependencyGraph() {
  echo 'Trying to open dependencygraph.svg in a browser.'
  # try to open in Firefox or Chrome
  open -a "Firefox" dependencygraph.svg || \
  open -a "Google Chrome" dependencygraph.svg || true
}

askForMaxDepth
installDotIfMissing
if [ ! -d src ]; then
  echo "src folder missing"
  getSrcFolder
else
  srcFolder="src"
fi
createDependencyGraph
showDependencyGraph
