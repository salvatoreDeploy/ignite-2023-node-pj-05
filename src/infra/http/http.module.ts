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

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AutneticateSessionController,
    CreateQuestionController,
    FetchRecentQuestionController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
  ],
})
export class HttpModule {}
