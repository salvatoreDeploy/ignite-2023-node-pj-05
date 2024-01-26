import { Module } from '@nestjs/common'
import { CreateAccountController } from './controller/create-account.controller'
import { AutneticateSessionController } from './controller/authenticate-session.controller'
import { CreateQuestionController } from './controller/create-question.controller'
import { FetchRecentQuestionController } from './controller/fetch-recent-question.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { FetchRecentQuestionUseCase } from '@/domain/forum/application/use-cases/fetch-recent-question'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AutneticateSessionController,
    CreateQuestionController,
    FetchRecentQuestionController,
  ],
  providers: [CreateQuestionUseCase, FetchRecentQuestionUseCase],
})
export class HttpModule {}
