#! /bin/bash
source ${HOME}/.bashrc

cd /var/www/rooster-farm-still
export NODE_ENV=development
npm run build
npm run start

