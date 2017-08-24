#!/bin/bash
# Loosely based on deploy script: https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
set -e # Exit with nonzero exit code if anything fails
set -x

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

echo "Running tests"

# npm test

echo "Deploying"

npm run build

# # Pull requests and commits to other branches shouldn't try to deploy, just build to verify
# if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
#     echo "Skipping deploy"
#     exit 0
# fi

openssl aes-256-cbc -K $encrypted_6c022d3a0baa_key -iv $encrypted_6c022d3a0baa_iv -in deploy-key.enc -out deploy-key -d
chmod 600 deploy-key
eval `ssh-agent -s`
ssh-add deploy-key
git config user.name "Automatic Publish"
git config user.email "RRMoelker@users.noreply.github.com"
NODE_DEBUG=gh-pages npm run deploy
