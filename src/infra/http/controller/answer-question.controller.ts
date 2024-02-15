import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/authenticate/current-user-decorator'
import { TokenPayload } from '@/infra/authenticate/jwt.strategy'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'

const answerQuestionBodySchema = z.object({
  content: z.string(),
})

type AnswerQuestion = z.infer<typeof answerQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(answerQuestionBodySchema)

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: AnswerQuestion,
    @CurrentUser() user: TokenPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body

    const userId = user.sub

    const result = await this.answerQuestion.execute({
      content,
      attachmentsIds: [],
      authorId: userId,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
