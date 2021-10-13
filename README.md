# astro-social-images

⚠️ Very early in development, more of a proof of concept than a real thing at the moment ⚠️

Add a component to generate Opengraph images to Astro, similar to [eleventy-plugin-social-images](https://github.com/manustays/eleventy-plugin-generate-social-images). Unlike other solutions, it uses a .svg file that is then converted to png through `sharp`. This mean no headless browser, no third-party service etc. It's all local

## Usage

```astro
---
import { SocialImage } from "astro-social-images"
---

<SocialImage options={{backgroundColor: "#28262c", texts: [{ content: "My super title", attributes: { x: "55", y: "105", "font-size": "70px", fill: "#fefffe" }}]}}>
```

will generate the following image:

![Image with "My super title" written in the top-left corner](./screenshot.png)

You can add as many texts as you want and also images, see [API](#api) for more ways to customize your images

```astro
<SocialImage
  options={{ backgroundColor: "#28262c", images: [{ url: "public/resized-social-card.png", attributes: { top: 375, left: 900 } }], texts: [{ content: "Princesseuh", attributes: { x: "55", y: "105", "font-size": "70px", fill: "#fefffe" } }, { content: "Introducing Astro: Ship Less JavaScript", attributes: { x: "50", y: "325", "font-size": "40px", fill: "#fefffe" } }] }} />
```

![Image with "Princesseuh" written in the top-left corner, "Introducing Astro: Ship Less JavaScript" a bit below and a ribbon (my personal website logo) in the bottom right corner](./screenshot2.png)

## API

The SocialImage component takes the following props:

### options

#### backgroundColor

Simply allows you to set a background color, takes a valid SVG fill color

Example:

```astro
<SocialImage options={{backgroundColor: "#28262c"}}>
```

#### texts

Allows you to add texts to the image, as many texts as you want can be added through this

Every text is an object with the following properties:

##### content

The content of your text

```json
{content: 'Hello'}
```

##### attributes

A list of attribute (also an object) to add to your text node, for instance writing the following:

```json
{content: 'Hello', attributes: { class: 'red' }}
```

will create this code: `<text class="red">Hello</text>`

#### images

Similarly to texts, allows you to add composites images to your image, every image is an object with the following properties:

##### url

URL to your image

#### attributes

Same as for images, please note that these attributes will be passed to [sharp#composite](https://sharp.pixelplumbing.com/api-composite#composite) and not as HTML attributes on the object. So for instance, to move your images you need to use `top` and `left`, not `x` and `y`

Resizing images is currently not supported

#### style

Allows you to set custom CSS to style your image with (If using it to change the color of a text, remember that SVGs use `fill` and not `color`)

Example:

```astro
<SocialImage options={{style: ".red { fill: red }", texts=[{content: "My red title", attributes={class: 'red'}}]}}>
```

#### customSVG

Allows you to add custom SVG to the file

TODO: Write example

### getURL

By default, the full tag needed to include the image is needed, that is

```html
<meta property="og:image" content="/socials/BEXIqGO.png">
```

However, if getURL is true, only the URL will be returned (`/socials/BEXIqGO.png` in this case)

Example:

```astro
<SocialImage getURL options={{backgroundColor: "#28262c", texts: [{ content: "My super title", attributes: { x: "55", y: "105", "font-size": "70px", fill: "#fefffe" }}]}}>
```
