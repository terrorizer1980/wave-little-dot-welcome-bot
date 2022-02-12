#!/bin/bash

function device_choose(){
  devices=$(adb devices | grep -v 'devices'| grep -Po '^\S+' )
  i=0
  echo "Choose one devices:" >&2
  for device in  $devices
  do
    let "i=i+1"
    printf '%-2s). %2s\n' $i $device >&2
  done

  printf "\nYour option: " >&2
  read opt
  
  echo $devices | cut -d ' ' -f $opt
}

function device_count(){
  let "count=$(adb devices | wc -l)-2"
  echo $count
}

function first_device(){
  device=$(adb devices | grep -v 'devices'| grep -Po '^\S+' | cut -d ' ' -f 1 )
  echo $device
}
