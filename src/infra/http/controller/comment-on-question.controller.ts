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
import { CommentOnQuestionCase } from '@/domain/forum/application/use-cases/comment-on-question'

const commentonQuestionBodySchema = z.object({
  content: z.string(),
})

type CommentOnQuestion = z.infer<typeof commentonQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(commentonQuestionBodySchema)

@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(private commentonQuestion: CommentOnQuestionCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CommentOnQuestion,
    @CurrentUser() user: TokenPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body

    const userId = user.sub

    const result = await this.commentonQuestion.execute({
      content,
      authorId: userId,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
