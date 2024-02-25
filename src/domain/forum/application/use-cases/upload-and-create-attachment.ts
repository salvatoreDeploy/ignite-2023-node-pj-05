import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidAttachmentTypeError } from './errors/invalid-attchment-type'
import { Attachment } from '../../enterprise/entities/attachment'
import { AttachmentsRepository } from '../repositories/attachment-repositoriy'
import { Uploader } from './uploader'

interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment
  }
>

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentRepository: AttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const { link } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const attachment = Attachment.create({
      title: fileName,
      link,
    })

    await this.attachmentRepository.create(attachment)

    return right({
      attachment,
    })
  }
}
