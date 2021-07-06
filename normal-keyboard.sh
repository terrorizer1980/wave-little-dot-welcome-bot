#!/bin/bash
adb shell input tap 300 2750
adb shell ime set com.google.android.inputmethod.latin/com.android.inputmethod.latin.LatinIME
adb shell input keyevent 4