#!/usr/bin/env node
const { execSync } = require("child_process");
const util = require("util");
const fs = require("fs");
const sharp = require("sharp");
const tesseract = require('node-tesr');
const screencap = ( a ) => {
  execSync(`adb shell screencap /sdcard/${a}`);
  execSync(`adb pull /sdcard/${a} ${a}`);
}
const img_name = 'temp.png';
const result_name = 'result.png';

var count = 0;

var users = { 
  DotDot:{
    last:9623857421333
  }
};

const welcomeMsg = fs.readFileSync("welcome.txt", 'utf8');

const formatDate = ( d ) => {
  return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}


function main(){
  screencap( img_name, result_name );
  processImage( main );
  if( count == 0 ){
    //sendMessage(fs.readFileSync("bulletin.txt"), formatDate(new Date()));
    //console.log( 
    //)
    bulletin();
  }
  count = ( count + 1 ) % 30;
  execSync("adb shell input tap 750 2500");
}

function bulletin(){
  let msg = util.format( fs.readFileSync("bulletin.txt", 'utf8'), execSync('date +"\ %Y-%m-%d\ %H:%M:%S"') );
  sendMessage( msg );
}


function processImage( callback ){
  sharp(img_name)
    //.extract({ width: 1000, height:1400, left: 0, top: 1250 })
    .extract({ width: 1000, height:530, left: 0, top: 2050 })
    .threshold(128)
    .toFile(result_name, err => {
      if (err) console.log(err);
      console.log( formatDate( new Date() ) );
        tesseract(result_name, { l: 'chi_tra', oem: 3, psm: 3 }, function(err, data) {
          let res = data.replace(/\ /g, '').split("\n")
                      .filter(v=>/已加入|來了/.test(v))
                      .map(v=>v.substr(0, v.length-3));
          console.log( data, res );
          res = res.filter( v => users[ v ] == undefined || ( users[ v ] && (Number(new Date()) > users[ v ].last )) );
          console.log( res, users );
          console.log( Number(new Date()) )
          for(let u of res){
            users[ u ] = {
              last: Number( new Date() ) + 60 * 1000
            }
          }
          for(let u of res)
            if( Number( new Date() ) > users[ u ].last ){
              user[ u ].last = 0;
            }
              //users[ u ]
              //delete users[ u ];
          if(res.length > 0){
            sendMessage( util.format(welcomeMsg, res.join(',') ) );
            execSync("sleep 1");
            //bulletin();
          }
          callback();
        });
    });
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


function resetKeyboard(){
  execSync("adb shell ime set com.google.android.inputmethod.latin/com.android.inputmethod.latin.LatinIME");
}
// adb shell ime set com.android.adbkeyboard/.AdbIME   
// com.google.android.inputmethod.latin/com.android.inputmethod.latin.LatinIME

// Program start
sharp.cache(false);
main();