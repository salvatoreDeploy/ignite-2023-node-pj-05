import { PaginationParams } from '@/core/repositories/pagination-params'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { PrismaQuestionAttachmentRepository } from './prisma-question-attchment-repository'

@Injectable()
export class PrismaQuestionsRepository implements IQuestionsRepository {
  constructor(
    private prisma: PrismaService,
    private questionAttachmentsRepository: PrismaQuestionAttachmentRepository,
  ) {}

  async create(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.create({
      data,
    })

    await this.questionAttachmentsRepository.createMany(
      question.attachment.getItems(),
    )
  }

  async findBySlug(slug: string): Promise<Questions> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findById(id: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findManyToRecents({ page }: PaginationParams): Promise<Questions[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map((question) => {
      return PrismaQuestionMapper.toDomain(question)
    })
  }

  async delete(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await Promise.all([
      this.prisma.question.update({
        where: {
          id: data.id,
        },
        data,
      }),

      this.questionAttachmentsRepository.createMany(
        question.attachment.getNewItems(),
      ),

      this.questionAttachmentsRepository.deleteMany(
        question.attachment.getRemovedItems(),
      ),
    ])
  }
}
