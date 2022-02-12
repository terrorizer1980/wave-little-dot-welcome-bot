#!/bin/bash
while true
do
  ./screenshot.sh
  convert _screenshot.png -crop 180x75+660+2475 nmsg.png
  res=$(tesseract ./nmsg.png stdout -l chi_tra | tr -d '[:space:]')
  if [ "$res" == "新留言" ];
  then 
    echo 1
    ./click.sh 660 2475
  else
    echo 0
  fi
  sleep 3
done