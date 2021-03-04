#! /usr/bin/env bash
bower=./node_modules/.bin/bower
git config url."https://".insteadOf git://

rm -rf node_modules
npm install