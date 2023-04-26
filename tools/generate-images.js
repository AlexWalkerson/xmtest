const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const inputDir = './src/assets/images-input';
const outputDir = './src/assets/images-output';
const imageListFile = './src/assets/image-list.json';
const outputWidth = 200;
const outputHeight = 300;
let imageList = [];

// Delete existing output folder and its contents
if (fs.existsSync(outputDir)) {
  fs.rmdirSync(outputDir, {recursive: true});
}

// Create new empty output folder
fs.mkdirSync(outputDir);

// Delete existing image-list.json file if it exists
if (fs.existsSync(imageListFile)) {
  fs.unlinkSync(imageListFile);
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  let processedCount = 0;
  const totalCount = files.length;

  files.forEach((file) => {
    const inputFile = path.join(inputDir, file);
    const ext = path.parse(file).ext;
    const uuid = uuidv4();
    const outputFilename = `${uuid}-${outputWidth}x${outputHeight}${ext}`;
    const outputFile = path.join(outputDir, outputFilename);
    const originalFilename = `${uuid}${ext}`;
    const originalFile = path.join(outputDir, originalFilename);

    // Copy and rename original file
    fs.copyFile(inputFile, originalFile, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Copied original ${file}`);
      }
    });

    sharp(inputFile)
    .resize(outputWidth, outputHeight)
    .jpeg({ quality: 80 })
    .toFile(outputFile, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Processed ${file}`);
        imageList.push({original: originalFilename, small: outputFilename});
        processedCount++;
        if (processedCount === totalCount) {
          const json = JSON.stringify(imageList, null, 2);
          fs.writeFileSync(imageListFile, json);
        }
      }
    });
  });
});
