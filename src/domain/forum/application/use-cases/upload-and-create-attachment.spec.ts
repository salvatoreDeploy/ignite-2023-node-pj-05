import { InMemoryUploadAndCreateAttachmentRepository } from 'test/repositories/in-memory-upload-and-create-attachment'
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment'
import { FakeUploader } from 'test/storage/fake-uploader'
import { InvalidAttachmentTypeError } from './errors/invalid-attchment-type'

let inMemoryAttachmentsRepository: InMemoryUploadAndCreateAttachmentRepository
let fakeUploader: FakeUploader
let sut: UploadAndCreateAttachmentUseCase

describe('Upload and create attachment', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository =
      new InMemoryUploadAndCreateAttachmentRepository()
    fakeUploader = new FakeUploader()
    sut = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentsRepository,
      fakeUploader,
    )
  })

  it('Should be able upload and create an attachment', async () => {
    const result = await sut.execute({
      fileName: 'profile.jpg',
      fileType: 'image/jpg',
      body: Buffer.from(''),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentsRepository.items[0],
    })
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.jpg',
      }),
    )
  })

  it('Should not be able to upload an attachment with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'music.mp3',
      fileType: 'audio/mp3',
      body: Buffer.from(''),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError)
  })
})
