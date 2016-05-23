'use strict'

const mkdirp = require('mkdirp');
const imageMagick = require('gm').subClass({ imageMagick: true });
const ProgressBar = require('progress');
const fs = require('fs');

const sourceDir = process.cwd();
const outDir = sourceDir + '/stitched/';

module.exports = () => {
	mkdirp.sync(outDir);
	const reg = /\.jpg$/;
	let files = fs.readdirSync(sourceDir).filter(fileName => reg.test(fileName));
	const len = files.length;
	let i = 0;

	const bar = new ProgressBar(`Processing ${files.length} files [:bar] :percent :etas`, {
		complete: '=',
		incomplete: ' ',
		total: files.length
	});

	while (i < len) {
		const fileNameA = files[i];
		const fileNameB = files[++i];
		const outFileName = `${outDir}/stitched_${i}.jpg`;

		imageMagick(fileNameA).append(fileNameB, true).write(outFileName, () => {
			// exported++;
			bar.tick(2);
		});
		i++;
	}
}
