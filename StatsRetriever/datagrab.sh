#!/bin/sh

git fetch upstream
git checkout master
git merge upstream/master
python3 datagrabber.py

./../datafill.sh

