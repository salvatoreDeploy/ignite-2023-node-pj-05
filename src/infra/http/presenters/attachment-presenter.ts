import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

export class HttpAttachmentPresenter {
  static toHttp(attachments: Attachment) {
    return {
      id: attachments.id.toString(),
      url: attachments.url,
      title: attachments.title,
    }
  }
}
