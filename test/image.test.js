import * as cheerio from 'cheerio';
import { expect } from 'chai';
import { getComponentOutput } from 'astro-component-tester';

// Testing the content of images is not.. really possible. (it is but, well, not really in the scope of this tiny project)
// So really what we'll test here is more so that an image is actually created and that the proper og tags are generated
describe('Image Generation with no props', () => {
	/** @type import('astro-component-tester').ComponentOutput */
	let component;
	let $;

	before(async () => {
		component = await getComponentOutput('./src/SocialImage.astro', {});
		$ = cheerio.load(component.html);
	});

	it('should generate an image file', async () => {
		expect(await component.fileExists('public/socials/Sglgip-.png')).to.equal(true);
	});

	it('should contain a meta tag with og:image', () => {
		expect($('meta[property="og:image"]').attr('content')).to.equal('/socials/Sglgip-.png');
	});

	it('should contain twitter tags', () => {
		expect($('meta[name="twitter:image"]').attr('content')).to.equal('/socials/Sglgip-.png');
		expect($('meta[name="twitter:card"]').attr('content')).to.equal('summary_large_image');
	});

	after(async () => {
		await component.clean();
	});
});
