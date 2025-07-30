export type ImageSize = 'square_hd' | 'square' | 'portrait_4_3' | 'portrait_16_9' | 'landscape_4_3' | 'landscape_16_9'

export function imageUrl(prompt: string, size: ImageSize = 'landscape_16_9') {
  const encoded = encodeURIComponent(prompt)
  return `https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=${encoded}&image_size=${size}`
}

