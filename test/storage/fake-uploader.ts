import {
  UploadParams,
  Uploader,
} from '@/domain/forum/application/storage/uploader'
import { randomUUID } from 'crypto'

interface Upload {
  fileName: string
  url: string
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = []

  async upload({ fileName }: UploadParams): Promise<{ url: string }> {
    const url = `http://localhost:3333/storage/${fileName}-${randomUUID()}.jpg`

    this.uploads.push({
      fileName,
      url,
    })

    return { url }
  }
}
