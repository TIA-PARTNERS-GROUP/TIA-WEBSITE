#!/bin/bash
docker stop tia-development-database
docker rm tia-development-database
docker run --name tia-development-database -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=tiapartners -p 3333:3306 -d mysql:8
if [ -t 1 ]; then
  read -p "Press Enter to exit..."
fi