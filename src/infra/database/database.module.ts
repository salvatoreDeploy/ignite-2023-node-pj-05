import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttchmentRepository } from './prisma/repositories/prisma-answer-attchment-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaNotificationRepositories } from './prisma/repositories/prisma-notification-repository'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attchment-repository'
import { PrismaQuestionCommentsQuestionsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-student-repository'

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
    PrismaAnswerAttchmentRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerRepository,
    PrismaNotificationRepositories,
    PrismaQuestionAttachmentRepository,
    PrismaQuestionCommentsQuestionsRepository,
  ],
  exports: [
    PrismaService,
    PrismaAnswerAttchmentRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerRepository,
    PrismaNotificationRepositories,
    PrismaQuestionAttachmentRepository,
    PrismaQuestionCommentsQuestionsRepository,
    IQuestionsRepository,
    StudentsRepository,
  ],
})
export class DatabaseModule {}
