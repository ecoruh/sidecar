const fs = require('fs');

const crop = (file, contents, _cropVar) => {
  let result = contents;
  console.log(`cropping ${file}..`)
  let matched = contents.match(/Overrides = {[\s\S]*?},\r?\n\t+Version = "13.0"/g);
  if (matched[0].includes('CropRect')) {
    // Overrides block has some data (customisation/editing took place)
    let cropped = matched[0].replace(/\t+CropAuto = false,\r?\n/g, '', 'utf8');
    cropped = cropped.replace(/\t+CropRect = {[\s,.0-9]*?},\r?\n/g, _cropVar, 'utf8');
    result = contents.replace(/Overrides = {[\s\S]*?},\r?\n\t+Version = "13.0"/g, cropped, 'utf8');
  } else {
    // Overrides block is empty, no customisation/editing took place
    let tVar = '' + _cropVar;
    tVar.trimRight();
    let cropped = matched[0].replace(/\r?\n\t+},/g, "\n" + tVar +"\t\t\t\t},", 'utf8');
    result = contents.replace(/Overrides = {\s+},\r?\n\t+Version = "13.0"/g, cropped, 'utf8');
  }
  fs.writeFileSync(`./${file}`, result, 'utf8');
}

let cropVar = fs.readFileSync('crop35mm', 'utf8');

if (process.argv.length > 2) {
  if (process.argv[2] == '?') {
    console.log('usage: sidecar [35|50], will crop dop files 35 or 50 mm, default: 35');
    process.exit(1);
  }
  if (process.argv[2] === "50") {
    cropVar = fs.readFileSync('crop50mm', 'utf8');;
  }
}

fs.readdirSync('./').forEach(file => {
  if (file.endsWith('.dop')) {
    let contents = fs.readFileSync(file, 'utf8');
    crop(file, contents, cropVar);
  }
});
