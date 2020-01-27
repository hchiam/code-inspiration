#!/bin/bash

# (will prompt for password)
curl -u 'hchiam' https://api.github.com/user/repos -d '{"name":"code-inspiration", "description":"Capture snippets of code inspiration while on the go."}'
git remote add origin 'git@github.com:hchiam/code-inspiration.git'
git add .
git commit -m "Set up repo"
git remote set-url origin https://github.com/hchiam/code-inspiration.git
git push --set-upstream origin master
echo; echo -------; echo;
git status
