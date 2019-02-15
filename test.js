const fs = require('fs');

const contents = fs.readFileSync(process.argv[2], 'utf8');
const crop35 = fs.readFileSync('crop35mm', 'utf8');
let matched = contents.match(/Overrides = {[\s\S]*?},\r?\n\t+Version = "13.0"/g);
console.log(matched);
if (matched[0].includes('CropRect')) {
  // matched[0] = matched[0].replace(/Overrides = {\r*\n/g, ''); 
  console.log('11111111111');
  let cropped = matched[0].replace(/\t+CropAuto = false,\n/g, '', 'utf8');
  cropped = cropped.replace(/\t+CropRect = {[\s,.0-9]*?},\n/g, crop35, 'utf8');
  console.log(cropped);
  const result = contents.replace(/Overrides = {[\s\S]*?},\r?\n\t+Version = "13.0"/g, cropped, 'utf8');
  console.log(result);
} else {
  console.log('2222222222')
  let cropped = matched[0].replace(/\n\t+},/g, "\n" + crop35 + "\n\t\t\t\t},", 'utf8');
  console.log(cropped);
  const result = contents.replace(/Overrides = {\s+},\s+Version = "13.0"/g, cropped, 'utf8');
  console.log(result);
}
