import { HttpException, Injectable } from '@nestjs/common';
import { NOTIFICATION_TYPES } from 'src/mocks/notification-type.mock';

@Injectable()
export class NotificationTypeService {
  companies = NOTIFICATION_TYPES;

  getNotification(notificationType: string): Promise<any> {
    //const id = Number(companyID);
    return new Promise((resolve) => {
      const notification = this.companies.find(
        (notification) => notification.name === notificationType,
      );
      if (!notification) {
        throw new HttpException('Notification type does not exist!', 404);
      }
      resolve(notification);
    });
  }
}
