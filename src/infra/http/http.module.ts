import { Module } from '@nestjs/common'
import { CreateAccountController } from './controller/create-account.controller'
import { AutneticateSessionController } from './controller/authenticate-session.controller'
import { CreateQuestionController } from './controller/create-question.controller'
import { FetchRecentQuestionController } from './controller/fetch-recent-question.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { FetchRecentQuestionUseCase } from '@/domain/forum/application/use-cases/fetch-recent-question'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { GetQuestionBySlugController } from './controller/get-question-by-slug.controller'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question.by-slug'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AutneticateSessionController,
    CreateQuestionController,
    FetchRecentQuestionController,
    GetQuestionBySlugController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
  ],
})
export class HttpModule {}
