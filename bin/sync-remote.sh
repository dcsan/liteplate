#!/usr/bin/env bash
# included by other deploy scripts

echo "run sync-remote at ${DATE}"

set -x

rsync . -avz  \
    --exclude /app/.meteor/local \
    --exclude '/tools/' \
    --exclude /build \
    --exclude /dump \
    --exclude /wiki \
    --exclude .git \
    --exclude .DS_Store \
    --progress \
    --delete \
    -L \
    $PRODUCTION_HOST:$DEPLOY_DIR

ssh $PRODUCTION_HOST "pm2 restart ${APP_NAME}"

echo "wait for server reboot / pong"
# wait for pong
sleep 3
curl --max-time 300 --connect-timeout 300 "${APP_HOST}/ping"

echo 'deploy done'
echo "-------------- logging $HKID --------------"
ssh $PRODUCTION_HOST "pm2 logs ${APP_NAME}"
