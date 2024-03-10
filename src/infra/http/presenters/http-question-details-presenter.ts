import { QuestionDeatails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { HttpAttachmentPresenter } from './attachment-presenter'

export class HttpQuestionDetailsPresenter {
  static toHttp(questionDetails: QuestionDeatails) {
    return {
      questionId: questionDetails.questionId.toString(),
      authorId: questionDetails.authorId.toString(),
      authorName: questionDetails.authorName,
      title: questionDetails.title,
      slug: questionDetails.slug.value,
      content: questionDetails.content,
      bestAnswerId: questionDetails.bestAnswerId?.toString(),
      attachments: questionDetails.attachments.map(
        HttpAttachmentPresenter.toHttp,
      ),
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
    }
  }
}
