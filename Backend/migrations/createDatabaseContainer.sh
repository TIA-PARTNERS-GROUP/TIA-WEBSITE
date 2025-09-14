#!/bin/bash
set -a
if [ -f ./.env ]; then
  . ./.env
else
  echo ".env file not found at ./.env"
  exit 1
fi
set +a

docker stop "$DB_CONTAINER_NAME"
docker rm "$DB_CONTAINER_NAME"
docker run --name "$DB_CONTAINER_NAME" \
  -e MYSQL_ROOT_PASSWORD="$DB_PASS" \
  -e MYSQL_DATABASE="$DB_NAME" \
  -p "$DB_PORT":3306 -d mysql:8