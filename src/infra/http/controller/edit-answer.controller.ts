import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/authenticate/current-user-decorator'
import { TokenPayload } from '@/infra/authenticate/jwt.strategy'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit.answer'

const editAnswerBodySchema = z.object({
  content: z.string(),
})

type EditAnswer = z.infer<typeof editAnswerBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema)

@Controller('/answer/:id')
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditAnswer,
    @CurrentUser() user: TokenPayload,
    @Param('id') answerId: string,
  ) {
    const { content } = body

    const userId = user.sub

    const result = await this.editAnswer.execute({
      answerId,
      attachmentsIds: [],
      authorId: userId,
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
