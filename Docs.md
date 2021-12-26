# Docs

The SocialImage component takes the following props:

## backgroundColor

Simply allows you to set a background color, takes a valid SVG fill color

Example:

```astro
<SocialImage backgroundColor="#28262c">
```

## texts

Allows you to add texts to the image, as many texts as you want can be added through this

Every text is an object with the following properties:

### content

The content of your text

```json
{ "content": "Hello" }
```

### attributes

A list of attribute (also an object) to add to your text node, for instance writing the following:

```json
{ "content": "Hello", "attributes": { "class": "red" } }
```

will create this code: `<text class="red">Hello</text>`

### Usage Example

```astro
<SocialImage
  texts={[
    { content: "My super title", attributes: { x: "100", y: "100", "font-size": "70px" } },
    { content: "My super description", attributes: { x: "100", y: "200", "font-size": "40px" } },
  ]}
/>
```

## images

Allows you to add composites images to your image, every image is an object with the following properties:

### url

URL to your image

### attributes

Same as for images, please note that these attributes will be passed to [sharp#composite](https://sharp.pixelplumbing.com/api-composite#composite) and not as HTML attributes on the object. So for instance, to move your images you need to use `top` and `left`, not `x` and `y`

Resizing images is currently not supported

## style

Allows you to set custom CSS to style your image with (If using it to change the color of a text, remember that SVGs use `fill` and not `color`)

When setting this, remember that you can't directly use a string, as the curly brackets will get replaced with parantheses automatically by Astro. You have to put the string in curly brackets

Example:

```astro
<SocialImage
  style={".red {fill: red}"}
  texts={[{content: "My red title", attributes={class: 'red'}}]}
/>
```

## customSVG

Allows you to add custom SVG to the file

TODO: Write example

## getURL

By default, the component will return the full tags needed for the image to work:

```html
<meta property="og:image" content="/socials/BEXIqGO.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="/socials/BEXIqGO.png" />
```

However, if getURL is true, only the URL will be returned (`/socials/BEXIqGO.png` in this case)

Example:

```astro
<SocialImage
  getURL
  backgroundColor="#28262c"
  texts={[
    {
      content: "My super title",
      attributes: { x: "55", y: "105", "font-size": "70px", fill: "#fefffe" },
    },
  ]}
/>
```

## globalOption

An object containing parameters that are not necessarily related to the current image being generated and could be shared among your images. When used directly in Javascript, this is the second argument of `generateSocialImage`. It has the following parameters:

### outputDir

Change the output directory of your images, if it doesn't exist it'll be automatically created.

By default `/public/socials`

### hashLength

Change the length of the hash used for the urls. The default value should be enough for everyone but feel free to change it if you need to

By default `7`

### urlPath

This will be used to generate the final URL of your files, the Opengraph Protocol stipulate that this should be an absolute path, thus you should change this to your website URL

By default `/`

Example (in JS instead of the component, but it works the same way in both):

```js
generateSocialImage(
  {
    backgroundColor: "#28262c",
    texts: [
      {
        content: "Princesseuh",
        attributes: { x: "55", y: "105", "font-size": "70px", fill: "#fefffe" },
      },
    ],
  },
  {
    urlPath: "https://princesseuh.dev/",
  },
)
```

will return the following object:

```js
{
  path: 'public/socials/syMGCnw.png',
  url: 'https://princesseuh.dev/socials/syMGCnw.png',
  hash: 'syMGCnw'
}
```

### publicDir

`astro-social-images` expect you to generate your images in the `public` folder of your Astro website, what this mean is that the final URLs of the images should be relative to the root of your `dist` folder, not to a `public` folder in it (aka, `website.com/socials/xxxxx.png`, not `website.com/public/socials/xxxxx.png`)

Thus `astro-social-images` needs to know the name of that folder since it's possible to change it through your Astro config (also, you might not want to generate images to a public folder at all, in which case you should set this to `undefined` or `null`)

By default `public`

---

In addition to this page, you can take a look at the [types.ts](./src/types.ts) file to see the attributes and properties that exists and their types. Could be useful!
