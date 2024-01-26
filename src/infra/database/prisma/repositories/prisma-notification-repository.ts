import { INotificationsRepository } from '@/domain/notification/application/repositories/notification-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaNotificationRepositories
  implements INotificationsRepository
{
  create(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Notification> {
    throw new Error('Method not implemented.')
  }

  save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
