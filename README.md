# astro-social-images

Add a component to generate Opengraph images to [Astro](https://astro.build/), inspired by [eleventy-plugin-social-images](https://github.com/manustays/eleventy-plugin-generate-social-images).

Unlike other solutions for Astro, it generates a svg that is then converted to a .png file through `sharp`. This means no headless browser, no third-party service etc.

It's all local which, well, can be good or bad depending on your needs, check out different options and see which one fits your project best!

## Installing

```shell
npm install astro-social-images
```

## Usage

```astro
---
import { SocialImage } from 'astro-social-images';
---

<SocialImage
  backgroundColor="#28262c"
  texts={[
    {
      content: 'My super title',
      attributes: { x: '55', y: '105', 'font-size': '70px', fill: '#fefffe' },
    },
  ]}
/>
```

will generate the following image:

![Image with "My super title" written in the top-left corner](./assets/screenshot.png)

Alternatively, you can use it directly in Javascript in your Astro frontmatters (or any other files). The component uses this in the background so both ways are supported.

When using Typescript, you'll get nice completions and types in your editor when using this, which is pretty cool

```js
import { generateSocialImage } from 'astro-social-images';

generateSocialImage({
  backgroundColor: '#28262c',
  texts: [
    {
      content: 'My super title',
      attributes: { x: '55', y: '105', 'font-size': '70px', fill: '#fefffe' },
    },
  ],
});
```

When used through JS, it won't generate the meta tags for you. Instead, the function will return an object containing the various properties you'll need to generate it yourself

You can add as many texts as you want and also images, see [the documentation](./Docs.md) for more ways to customize your images

```astro
---
import { SocialImage } from 'astro-social-images';
---

<SocialImage
  backgroundColor="#28262c"
  images={[{ url: 'public/resized-social-card.png', attributes: { top: 375, left: 900 } }]}
  texts={[
    {
      content: 'Princesseuh',
      attributes: { x: '55', y: '105', 'font-size': '70px', fill: '#fefffe' },
    },
    {
      content: 'Introducing Astro: Ship Less JavaScript',
      attributes: { x: '50', y: '325', 'font-size': '40px', fill: '#fefffe' },
    },
  ]}
/>
```

![Image with "Princesseuh" written in the top-left corner, "Introducing Astro: Ship Less JavaScript" a bit below and a ribbon (my personal website logo) in the bottom right corner](./assets/screenshot2.png)

## [Complete Docs available here](./Docs.md)

## FAQ

### How to use custom fonts

Sharp doesn't load external fonts, the best way to get this working at the moment is by following the custom fonts instructions in the [eleventy-plugin-generate-social-images README](https://github.com/manustays/eleventy-plugin-generate-social-images#custom-fonts)
