#!/bin/bash
device=$1
fn=$2
if [ -z "$2" ]; then
  fn="_screenshot"
fi
if [ -z "$1" ]; then
 source .default_device
  adb -s "$device" shell screencap -p > $fn.png
else
  adb -s $(./print_device_id $1) shell screencap -p > $fn.png
fi