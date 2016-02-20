#!/usr/bin/env bash


HOST_DOMAIN="host.x.ai"

export HKID=hk2
export PRODUCTION_HOST=root@${HOST_DOMAIN}
export DEPLOY_DIR=/root/www/liteapp
export APP_HOST="http://${HOST_DOMAIN}"
export APP_NAME=liteapp

echo "APP_HOST = ${APP_HOST}"

bin/sync-remote.sh

## dont reload hk1
# bin/reload-remote.sh
