#! /usr/bin/env node
'use strict'

const yargs = require('yargs');
const portrait = require('./portrait');
const stitch = require('./stitch');

yargs
	.command(
		'portrait',
		'rotates pictures in current dir',
		() => {},
		portrait
	)
	.command(
		'stitch',
		'joins pictures together 2 by 2',
		() => {},
		stitch
	)
	.argv;
