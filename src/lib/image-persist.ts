import localforage from 'localforage'
import { nanoid as uuid } from 'nanoid'

class ImageStorage {
  public async storeImage(base64: string): Promise<string> {
    const key = uuid()
    await localforage.setItem(key, base64)
    return key
  }

  public async retrieveImage(uuid: string): Promise<string | null> {
    const images = await localforage.getItem(uuid)
    return images as string
  }

  clear() {
    localforage.clear()
  }
}

export const imageStore = new ImageStorage()
