// We can't import sharp normally otherwise Rollup, Snowpack, everyone will panic
import { createRequire } from "module"
import { resolve } from "path"

const cjs = createRequire(resolve("node_modules", "astro-social-images", "dist", "main.js"))
const sharp = cjs("sharp")

import { createHash } from "crypto"
import base64url from "base64url"
import { existsSync } from "fs"
import type { Config, GlobalConfig } from "./types"

const defaultConfig: Config = {
  texts: [],
  images: [],
}

const defaultGlobalConfig: GlobalConfig = {
  outputDir: "public/socials",
  hashLength: 7,
}

function generateImage(url: URL, options: Config = {}, globalOptions: GlobalConfig = {}): string {
  // Merge with default configs
  options = { ...defaultConfig, ...options }
  globalOptions = { ...defaultGlobalConfig, ...globalOptions }

  const hash = getHash(options, globalOptions)

  // If the image already exists, let's bail out
  if (existsSync(`${globalOptions.outputDir}/${hash}.png`)) {
    return `${globalOptions.outputDir}/${hash}.png`
  }

  const textList = options.texts
    .map((text) => {
      const attrList = Object.entries(text.attributes || {})
        .map((attr) => {
          return `${attr[0]}="${attr[1]}"`
        })
        .join(" ")
      return `<text ${attrList}>${text.content}</text>`
    })
    .join("\n")

  const backgroundColor = options.backgroundColor
    ? `<rect width="100%" height="100%" fill="${options.backgroundColor}" />`
    : ""

  const CSSStyles = options.style ? `<style>${options.style}</style>` : ""

  const template = `<svg width="1200" height="630" viewbox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${CSSStyles}
    </defs>

    ${backgroundColor}

    ${options.customSVG || ""}

    <g>
      ${textList}
    </g>
	</svg>`

  const svgBuffer = Buffer.from(template)

  const imageList = options.images.map((image) => {
    return { input: image.url, ...image.attributes }
  })

  const result = sharp(svgBuffer)
    .resize(1200, 630)
    .composite(imageList)
    .png()
    .toFile(`${globalOptions.outputDir}/${hash}.png`, function (err, info) {
      if (err) throw err
      return info
    })

  return result.options.fileOut
}

function getHash(options: Config, globalOptions: GlobalConfig) {
  const hash = createHash("sha256")

  hash.update(JSON.stringify(options))

  return base64url(hash.digest()).substring(0, globalOptions.hashLength || 5)
}

export { generateImage, Config }
