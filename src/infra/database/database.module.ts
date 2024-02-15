import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttachmentRepository } from './prisma/repositories/prisma-answer-attchment-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaNotificationRepositories } from './prisma/repositories/prisma-notification-repository'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attchment-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-student-repository'
import { IAnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { IAnswerAttchmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-reposritory'
import { INotificationsRepository } from '@/domain/notification/application/repositories/notification-repository'
import { IQuestionAttchmentsRepository } from '@/domain/forum/application/repositories/question-attachments-reposritory'
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: IQuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: IAnswerAttchmentsRepository,
      useClass: PrismaAnswerAttachmentRepository,
    },
    {
      provide: IAnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: IAnswerRepository,
      useClass: PrismaAnswerRepository,
    },
    {
      provide: INotificationsRepository,
      useClass: PrismaNotificationRepositories,
    },
    {
      provide: IQuestionAttchmentsRepository,
      useClass: PrismaQuestionAttachmentRepository,
    },
    {
      provide: IQuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
  ],
  exports: [
    PrismaService,
    IAnswerAttchmentsRepository,
    IAnswerCommentsRepository,
    IAnswerRepository,
    INotificationsRepository,
    IQuestionAttchmentsRepository,
    IQuestionCommentsRepository,
    IQuestionsRepository,
    StudentsRepository,
  ],
})
export class DatabaseModule {}
