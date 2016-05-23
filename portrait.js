'use strict'

const mkdirp = require('mkdirp');
const imageMagick = require('gm').subClass({ imageMagick: true });
const ProgressBar = require('progress');
const fs = require('fs');

const sourceDir = process.cwd();
const outDir = sourceDir + '/rotated/';

module.exports = () => {
	mkdirp.sync(outDir);
	const reg = /\.jpg$/;
	let files = fs.readdirSync(sourceDir).filter(fileName => reg.test(fileName));
	let exported = 0;
	let rotated = 0;

	const bar = new ProgressBar(`Processing ${files.length} files [:bar] :percent :etas`, {
		complete: '=',
		incomplete: ' ',
		total: files.length
	});

	files.forEach((fileName) => {
		imageMagick(fileName).size((err, value) => {
			let degrees = 0;
			if (value.width > value.height) {
				degrees = 90;
				rotated++;
			}

			imageMagick(fileName).rotate('#ffffff', degrees).resize(null, 2049).write(outDir + fileName, () => {
				exported++;
				bar.tick();
			});
		});
	});

	// console.log(`Finished: Rotated ${rotated}, Exported ${exported}`);
}
