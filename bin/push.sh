#!/bin/sh
git add .
git add -u
read -r -p 'Commit message: ' desc  # prompt user for commit message
git commit -m "$desc"
git push origin $branch
