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
import { EditQuestionController } from './controller/edit-question.controller'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { DeleteQuestionController } from './controller/delete-question.controller'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { AnswerQuestionController } from './controller/answer-question.controller'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { EditAnswerController } from './controller/edit-answer.controller'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit.answer'
import { DeleteAnswerController } from './controller/delete-answer.controller'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { FetchQuestionAnswerController } from './controller/fetch-question-answer.controller'
import { FetchQuestionAnswerUseCase } from '@/domain/forum/application/use-cases/fetch-question-answer'
import { ChooseQuestionBestAnswerController } from './controller/choose-question-best-answer.controller'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { CommentOnQuestionController } from './controller/comment-on-question.controller'
import { CommentOnQuestionCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { DeleteQuestionCommentCase } from '@/domain/forum/application/use-cases/delete-question-comment'
import { DeleteQuestionCommentController } from './controller/delete-question-comment.controller'
import { CommentOnAnswerController } from './controller/comment-on-answer.controller'
import { CommentOnAnswerCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { DeleteAnswerCommentController } from './controller/delete-answer-comment.controller'
import { DeleteAnswerCommentCase } from '@/domain/forum/application/use-cases/delete-answer-comment'
import { FetchQuestionCommentsController } from './controller/fetch-question-comments.controller'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comment'
import { FetchAnswerCommentsController } from './controller/fetch-answer-comment.controller'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comment'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AutneticateSessionController,
    CreateQuestionController,
    FetchRecentQuestionController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswerController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
    FetchAnswerCommentsController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionAnswerUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionCase,
    DeleteQuestionCommentCase,
    CommentOnAnswerCase,
    DeleteAnswerCommentCase,
    FetchQuestionCommentsUseCase,
    FetchAnswerCommentsUseCase,
  ],
})
export class HttpModule {}
