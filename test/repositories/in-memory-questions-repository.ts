/* eslint-disable prettier/prettier */
import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'
import { InMemoryStudentsRepository } from './in-memory-student-repository'
import { InMemoryUploadAndCreateAttachmentRepository } from './in-memory-upload-and-create-attachment'
import { InMemoryQuestionAttchmentRepository } from './in-memory-question-attchment-repository'
import { QuestionDeatails } from '@/domain/forum/enterprise/entities/value-objects/question-details'

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public items: Questions[] = []

  constructor(
    private questionAttchmentRepository: InMemoryQuestionAttchmentRepository,
    private attachmentsRepository: InMemoryUploadAndCreateAttachmentRepository,
    private studentRepository: InMemoryStudentsRepository
  ) { }

  async create(question: Questions): Promise<void> {
    this.items.push(question)

    await this.questionAttchmentRepository.createMany(question.attachment.getItems())

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findBySlug(slug: string): Promise<Questions | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findDetailsBySlug(slug: string): Promise<QuestionDeatails | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    const author = this.studentRepository.items.find(student => {
      return student.id.equals(question.authorId)
    })

    if (!author) {
      throw new Error(`Author whith ID "${question.authorId.toString()}" does not exists`)
    }

    const questionAttachments = this.questionAttchmentRepository.items.filter(questionAttachment => {
      return questionAttachment.questionId.equals(question.id)
    })

    const attachments = questionAttachments.map(questionAttachment => {
      const attachment = this.attachmentsRepository.items.find(attachment => {
        return attachment.id.equals(questionAttachment.attachmentId)
      })

      if (!attachment) {
        throw new Error(`Author whith ID "${questionAttachment.attachmentId.toString()}" does not exists`)
      }

      return attachment
    })

    return QuestionDeatails.create({
      questionId: question.id,
      authorId: question.authorId,
      authorName: author.name,
      content: question.content,
      title: question.title,
      slug: question.slug,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      bestAnswerId: question.bestAnswerId,
      attachments
    })
  }

  async findById(id: string): Promise<Questions | null> {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findManyToRecents({ page }: PaginationParams): Promise<Questions[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async delete(question: Questions): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)

    this.questionAttchmentRepository.deleteManyByQuestionId(question.id.toString())
  }

  async save(question: Questions): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[itemIndex] = question

    await this.questionAttchmentRepository.createMany(question.attachment.getNewItems())

    await this.questionAttchmentRepository.deleteMany(question.attachment.getRemovedItems())

    DomainEvents.dispatchEventsForAggregate(question.id)
  }
}
