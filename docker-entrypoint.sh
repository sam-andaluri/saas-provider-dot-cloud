#!/bin/bash
set -eu

# Add assignment 
echo "window._env_ = {" > /usr/share/nginx/html/config.js
for var in `env`; do
    echo $var | awk -F'=' '{ print "\"" $1 "\"" ":" "\"" $2 "\"" "," }' >> /usr/share/nginx/html/config.js
done
echo "}" >> /usr/share/nginx/html/config.js

nginx -g "daemon off;"

