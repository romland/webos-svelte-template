import { execSync } from "child_process";
import fs from 'fs';

export function generateVersion(fromFileName)
{
	// Get git commit count to be used as 'patch' in semantic versioning.
	// Not great, but beats bumping this crap manually in two different files.
	let commitCount = 0;

	try {
		execSync("git rev-list --count master").toString().trim();
	} catch(ex) {
		console.warn("[NOT FATAL] But git failed, cannot automatically bump version.");
	}

	// Get major/minor version from package.json
	const packageJson = JSON.parse(
		fs.readFileSync(fromFileName)
		.toString()
	);
	const packageVersion = packageJson["version"];

	// Replace 0123456789 with commit-count and we should get a version string like 1.0.500
	const version = `${packageVersion.replace("123456789", "")}${commitCount}`;

	return version;
}
