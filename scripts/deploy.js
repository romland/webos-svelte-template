// useage: node deploy <target-tv>
import fs from 'fs';
import { spawn } from 'child_process';

const appInfo = JSON.parse(fs.readFileSync("./dist/appinfo.json", "utf8"));

// Spawn e.g. ares-install ui30_0.0.1_all.ipk -d oled-livingroom
const aresInstall = spawn('ares-install', [`${appInfo.id}_${appInfo.version}_all.ipk`, '-d', process.argv[2]]);

aresInstall.stdout.on('data', function (data) { console.log('deploy info: ' + data.toString()); });
aresInstall.stderr.on('data', function (data) { console.log('deploy error: ' + data.toString()); });

aresInstall.on('exit', function (code) {
	// console.log(code.toString());
});
