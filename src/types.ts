interface Config {
  images?: Image[]
  texts?: Text[]
  style?: string
  backgroundColor?: string
  customSVG?: string
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

interface GlobalConfig {
  outputDir?: string
  hashLength?: number
}

export { Config, Image, Text, GlobalConfig }
