import { existsSync, mkdirSync } from 'fs';
import { createHash } from 'crypto';
import { createRequire } from 'module';

// We can't import sharp normally because it's a CJS thing and those don't seems to work well with Astro, Vite, everyone
const cjs = createRequire(import.meta.url);
const sharp = cjs('sharp');

import type { Config, GlobalConfig, Text, SocialImageResult } from './types';

const defaultConfig: Config = {
	texts: [],
	images: [],
};

const defaultGlobalConfig: GlobalConfig = {
	outputDir: 'public/socials',
	urlPath: '/',
	publicDir: 'public',
	hashLength: 7,
};

export function generateImage(options: Config = {}, globalOptions: GlobalConfig = {}): SocialImageResult {
	// Merge with default configs
	options = Object.assign(defaultConfig, options);
	globalOptions = Object.assign(defaultGlobalConfig, globalOptions);

	const hash = getHash(options, globalOptions);
	let outputDirURL = globalOptions.outputDir;

	// If our user supplied a publicDir, let's remove it from the generated URLs
	if (globalOptions.publicDir) {
		outputDirURL = outputDirURL.replace(globalOptions.publicDir.endsWith('/') ? globalOptions.publicDir : globalOptions.publicDir + '/', '');
	}

	// Create output dir if it doesn't exists
	if (!existsSync(globalOptions.outputDir)) {
		mkdirSync(globalOptions.outputDir, { recursive: true });
	}

	// If the image already exists, let's bail out and return its info
	if (existsSync(`${globalOptions.outputDir}/${hash}.png`)) {
		return {
			path: `${globalOptions.outputDir}/${hash}.png`,
			url: `${globalOptions.urlPath}${outputDirURL}/${hash}.png`,
			hash: hash,
		};
	}

	// Create template
	const template = createTemplate(options);

	// Images are not embedded in the template, instead they're added to the image through sharp
	const imageList = options.images.map((image) => {
		return { input: image.url, ...image.attributes };
	});

	// Generate our image
	const svgBuffer = Buffer.from(template);
	sharp(svgBuffer)
		.resize(1200, 630)
		.composite(imageList)
		.png()
		.toFile(`${globalOptions.outputDir}/${hash}.png`, function (err, info) {
			if (err) throw err;
			return info;
		});

	return {
		path: `${globalOptions.outputDir}/${hash}.png`,
		url: `${globalOptions.urlPath}${outputDirURL}/${hash}.png`,
		hash: hash,
	};
}

function getHash(options: Config, globalOptions: GlobalConfig) {
	const hash = createHash('sha256');

	hash.update(JSON.stringify(options));
	hash.update(JSON.stringify(globalOptions));

	return hash.digest('base64url').substring(0, globalOptions.hashLength || 5);
}

function generateTextsMarkup(texts: Text[]): string {
	return texts
		.map((text) => {
			// Get attributes
			const attrList = Object.entries(text.attributes || {})
				.map((attr) => {
					return `${attr[0]}="${attr[1]}"`;
				})
				.join(' ');

			return `<text ${attrList}>${text.content}</text>`;
		})
		.join('\n');
}

function createTemplate(options: Config): string {
	// Get texts and images
	const textList = generateTextsMarkup(options.texts);

	const backgroundColor = options.backgroundColor ? `<rect width="100%" height="100%" fill="${options.backgroundColor}" />` : '';

	const CSSStyles = options.style ? `<style>${options.style}</style>` : '';

	return `<svg width="1200" height="630" viewbox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${CSSStyles}
    </defs>

    ${backgroundColor}

    ${options.customSVG || ''}

    <g>
      ${textList}
    </g>
	</svg>`;
}
