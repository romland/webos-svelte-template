/**
 * Post-build (but pre-packaging) processing of files for a WebOS Svelte 
 * application.
 * 
 * I had some trouble using absolute URLs in packages being deployed to WebOS
 * since root is not the root of the package and Vite expects it to be.
 * 
 * This also deletes some unnecessary assets from the build and copies appinfo
 * into place for packaging the 'dist' directory to be deployed to WebOS.
 */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import { generateVersion } from './generateVersion.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");

// Files we need to process for root-path fix.
const pathFixFiles = [ "index.html", "global.css" ];

class PostProcess
{
	constructor()
	{
		console.log(`-> Post-build on folder ${distDir}`);

		for(let i = 0; i < pathFixFiles.length; i++) {
			this.processFile(pathFixFiles[i]);
		}

		this.deleteAssets();
		this.copyAppInfo();
	}

	// TODO: Check (somehow) whether we are putting scripts inline or not; delete only if we are.
	deleteAssets()
	{
		console.log("\tDeleting assets...");

		// We already have the font on a live device.
		fs.rmSync(distDir + "/LG_Display-Regular.ttf");

		// These are included inline
		fs.rmSync(distDir + "/assets", { recursive: true });
	}

	copyAppInfo()
	{
		const version = generateVersion("package.json");
		const appInfoStr = fs.readFileSync(__dirname + "/../webos-appinfo.json", "utf8");
		let appInfo = JSON.parse(appInfoStr);
		appInfo.version = version;

		console.log("\tCreating appinfo.json with corrected details...");
		fs.writeFileSync(distDir + "/appinfo.json", JSON.stringify(appInfo));
	}

	processFile(filename)
	{
		let changes = 0;
		const path = `${distDir}/${filename}`;

		console.log("\tProcessing", filename);

		let content = fs.readFileSync(path).toString();

		// a href
		content = content.replace(/href=["']\/(.*?)["']/g, function(m, $1) {
			changes++;
			console.log("\t\tFixing absolute URL", $1);
			return 'href="./' + $1 + '"';
		});

		// CSS url(...)
		content = content.replace(/url\(['"]\/(.*?)['"]\)/g, function(m, $1) {
			changes++;
			console.log("\t\tFixing absolute URL", $1);
			return 'url=("./' + $1 + '")';
		});

		if(changes > 0) {
			console.log("\tSaving", filename);
			fs.writeFileSync(path, content);
		}

		return true;
	}
}

new PostProcess();
