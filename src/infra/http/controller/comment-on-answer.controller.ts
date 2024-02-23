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
import { CommentOnAnswerCase } from '@/domain/forum/application/use-cases/comment-on-answer'

const commentonAnswerBodySchema = z.object({
  content: z.string(),
})

type CommentOnAnswer = z.infer<typeof commentonAnswerBodySchema>

const bodyValidationPipe = new ZodValidationPipe(commentonAnswerBodySchema)

@Controller('/answers/:answerId/comments')
export class CommentOnAnswerController {
  constructor(private commentonAnswer: CommentOnAnswerCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CommentOnAnswer,
    @CurrentUser() user: TokenPayload,
    @Param('answerId') answerId: string,
  ) {
    const { content } = body

    const userId = user.sub

    const result = await this.commentonAnswer.execute({
      content,
      authorId: userId,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
