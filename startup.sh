#! /bin/bash
# source ${HOME}/.bashrc

cd /var/www/rooster-farm-still
export NODE_ENV=production
export PORT=2300
npm run build
npm run start

