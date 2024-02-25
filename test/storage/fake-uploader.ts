import {
  UploadParams,
  Uploader,
} from '@/domain/forum/application/storage/uploader'
import { randomUUID } from 'crypto'

interface Upload {
  fileName: string
  link: string
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = []

  async upload({ fileName }: UploadParams): Promise<{ link: string }> {
    const link = `http://localhost:3333/storage/${fileName}-${randomUUID()}.jpg`

    this.uploads.push({
      fileName,
      link,
    })

    return { link }
  }
}
