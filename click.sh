#!/bin/bash
source .default_device
adb -s $device shell input tap $1 $2