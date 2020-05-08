#!/bin/sh
git add .
git add -u
read -r -p 'Commit message: ' desc # prompt user for commit message
npm run build
git commit -m "$desc"
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
git push origin $branch
netlify deploy
