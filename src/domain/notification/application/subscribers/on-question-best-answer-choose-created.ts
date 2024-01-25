import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { IAnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { QuestionBestAnswerChooseEvent } from '@/domain/forum/enterprise/events/question-best-answer-choose-event'

export class OnQuestionBestAnswerChooseCreated implements EventHandler {
  constructor(
    private answerRepository: IAnswerRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChooseEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChooseEvent) {
    const answer = await this.answerRepository.findById(bestAnswerId.toString())

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: 'Sua resposta foi escolhida!',
        content: `A resposta que você enviou em "${question.title.substring(
          0,
          20,
        )}" foi escolhida pelo autor`,
      })
    }
  }
}
