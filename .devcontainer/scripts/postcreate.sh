#!/bin/sh

git config user.email "$GIT_EMAIL"
git config user.name "$GIT_NAME"

npm update --location=global npm
npm update --location=global pnpm

pnpm install
