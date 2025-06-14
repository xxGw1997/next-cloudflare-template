'use server'

import { createAI } from '@/lib/ai'
import { createR2 } from '@/lib/r2'

export async function cloudflareTextToImage(prompt: string) {
  try {
    const ai = createAI()
    const r2 = createR2()

    const response = await ai.run('@cf/black-forest-labs/flux-1-schnell', {
      prompt
    })

    if (!response.image) {
      throw new Error('No image was generated by the AI model')
    }

    const base64Image = response.image.startsWith('data:image/')
      ? response.image
      : `data:image/png;base64,${response.image}`

    const imageBuffer = new Uint8Array(Buffer.from(response.image, 'base64'))

    const sanitizedPrompt = prompt.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 30)
    const filename = `${Date.now()}-${sanitizedPrompt}.png`

    try {
      await r2.put(filename, imageBuffer, {
        httpMetadata: {
          contentType: 'image/png'
        }
      })
    } catch (r2Error) {
      console.error(`Error storing image in R2: ${r2Error}`)
    }

    return {
      success: true,
      imageData: base64Image,
      imageUrl: filename,
      error: null
    }
  } catch (error) {
    console.error(`Image generating error: ${error}`)
    return {
      success: false,
      imageData: null,
      imageUrl: null,
      error: error instanceof Error ? error.message : 'Unknow error occurred.'
    }
  }
}
