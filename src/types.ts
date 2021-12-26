interface Config {
  images?: Image[]
  texts?: Text[]
  style?: string
  backgroundColor?: string
  customSVG?: string
}

interface GlobalConfig {
  outputDir?: string
  hashLength?: number
  publicDir?: string
  urlPath?: string
}

interface Image {
  url: string
  attributes: {
    [attrName: string]: unknown
  }
}

interface Text {
  content: string
  attributes: {
    [attrName: string]: string
  }
}

interface SocialImageResult {
  url: string
  path: string
  hash: string
}

export { Config, GlobalConfig, Image, Text, SocialImageResult }
