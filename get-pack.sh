#!/bin/bash
## Program headers
source ./common.sh

## Headers end
iofd=$(device_count)
device=-1
if [ "$iofd" -eq "1" ];
then
  echo "Get first device">&2
  device=$(first_device)
elif [ "$iofd" -gt "1" ]
then
  echo "More then one" >&2
  device=$(device_choose)
else
  echo "No device can be detect" >&2
  exit 1
fi

echo $device

time=$1
if [ -z "$time" ];
then
  read time
fi

sleep $time
adb -s $device shell input tap 1000 1500
adb -s $device shell input tap 1000 880
adb -s $device shell input tap 700 1700
adb -s $device shell input tap 700 1700
echo "Finish"