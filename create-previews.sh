#!/bin/bash

cd assets
for file in `ls *.mov`
do
  echo $file
  ffmpeg -ss 00:00:05 -i $file -vframes 1 -q:v 2 previews/$file.jpg
done
