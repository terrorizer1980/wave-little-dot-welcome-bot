#!/usr/bin/env node
const { execSync } = require("child_process");
const util = require("util");
const sharp = require("sharp");
const tesseract = require('node-tesr');
const screencap = ( ) => {
  execSync("adb shell screencap /sdcard/temp.png");
  execSync("adb pull /sdcard/temp.png temp.png");
}
const img_name = 'temp.png';
const result_name = 'result.png';

var users = {  };

const formatDate = ( d ) => {
  return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

function main(){
  sendMessage( process.argv[2] );
}

function sendMessage( msg ){
  let m = msg.split("").map(v=>v.charCodeAt());
  execSync("adb shell ime set com.android.adbkeyboard/.AdbIME");
  execSync("adb shell input tap 300 2750");
  
  execSync(`adb shell am broadcast -a ADB_INPUT_CHARS --eia chars '${m.join(",")}'`);
  //execSync("adb shell ime set com.google.android.inputmethod.latin/com.android.inputmethod.latin.LatinIME");
  //execSync("sleep 1");
  execSync("adb shell input tap 1350 2700");
  //adb shell ime set com.google.android.inputmethod.latin/com.android.inputmethod.latin.LatinIMEexecSync("adb shell input tap 420 2750 && adb shell input keyevent 4");
}


main();
