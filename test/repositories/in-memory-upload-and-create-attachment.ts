/* eslint-disable prettier/prettier */
import { AttachmentsRepository } from "@/domain/forum/application/repositories/attachment-repositoriy"
import { Attachment } from "@/domain/forum/enterprise/entities/attachment"

export class InMemoryUploadAndCreateAttachmentRepository implements AttachmentsRepository {
  public items: Attachment[] = []


  async create(attachment: Attachment): Promise<void> {
    this.items.push(attachment)
  }
}
