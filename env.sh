#!/bin/bash

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment 
echo "{" >> ./env-config.js
for var in `env`; do
    echo $var | awk -F'=' '{ print "\"" $1 "\"" ":" "\"" $2 "\"" "," }' >> ./env-config.js
done
echo "}" >> ./env-config.js
