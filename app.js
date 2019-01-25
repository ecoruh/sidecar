const fs = require('fs');

let crop35 = `Overrides = {
					CropAuto = false,
					CropRect = {
						0.11830280721187592,
						0.099756039679050446,
						0.76287390291690826,
						0.79999997466802597,
					},
				},`;

let crop50 = `Overrides = {
					CropAuto = false,
					CropRect = {
						0.23266780376434326,
						0.217116579413414,
						0.53404098749160767,
						0.56003101170063019,
					},
				},`;

const crop = (file, contents, cropVar) => {
	if(contents.match(/Overrides = {\n\t+},/g)) {
		console.log(`empty overrides detected for ${file}..cropping..`);
		let cropped = contents.replace(/Overrides = {[\s\S]*?},/g, cropVar, 'utf8');
		fs.writeFileSync(file, cropped);
	}
} 

let cropVar = crop35;

if (process.argv.length > 2) {
	if (process.argv[2] == '?') {
		console.log('usage: sidecar [35] | 50, will crop dop files 35 or 50 mm, default: 35');
		process.exit(1);
	}
	if (process.argv[2] === "50") {
		cropVar = crop50;
	}
}

fs.readdirSync('./').forEach(file => {
	if (file.endsWith('.dop')) {
		let contents = fs.readFileSync(file, 'utf8');
		crop(file, contents, cropVar);
	}
});


