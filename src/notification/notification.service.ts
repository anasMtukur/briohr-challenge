import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Company } from 'src/company/company.model';
import { ResponseMessage } from 'src/dto/response';
import { NotificationType } from 'src/notification-type/notification-type.model';
import { User } from 'src/user/user.model';
import { UINotification } from './notification.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(UINotification)
    private readonly notificationModel: ReturnModelType<typeof UINotification>,
  ) {}

  async sendNotification(
    user: User,
    company: Company,
    notificationType: NotificationType,
  ): Promise<ResponseMessage> {
    let subjectText = '';
    const messageText = this.formatMessage(
      false,
      notificationType.message,
      notificationType.name,
      user,
      company,
    );
    if (notificationType.subject !== 'none') {
      subjectText = this.formatMessage(
        true,
        notificationType.subject,
        notificationType.name,
        user,
        company,
      );
    }
    const result = this.doSendNotification(
      messageText,
      subjectText,
      notificationType.name,
      notificationType.channels,
      user,
      company,
    );

    return result;
  }

  private formatMessage(
    isSubject: boolean,
    message: string,
    notificationType: string,
    user: User,
    company: Company,
  ): string {
    let formattedMessage = '';
    switch (notificationType) {
      case 'leave-balance-reminder': {
        formattedMessage = message.replace('{{PH_USERNAME}}', user.name);
        break;
      }
      case 'monthly-payslip': {
        formattedMessage = message.replace('{{PH_USERNAME}}', user.name);
        break;
      }
      case 'happy-birthday': {
        formattedMessage = isSubject
          ? message.replace('{{PH_USERNAME}}', user.name)
          : message
              .replace('{{PH_USERNAME}}', user.name)
              .replace('{{PH_COMPANYNAME}}', company.name);
        break;
      }
      default: {
        formattedMessage = 'No Message';
        break;
      }
    }
    return formattedMessage;
  }

  private async doSendNotification(
    message: string,
    subject: string,
    notificationType: string,
    notificationTypeChannels: string[],
    recipient: User,
    company: Company,
  ): Promise<ResponseMessage> {
    const resp: ResponseMessage = {};
    notificationTypeChannels.forEach(async (channel) => {
      if (
        this.isUserSubscribedToChannel(channel, recipient) ||
        this.isCompanySubscribedToChannel(channel, company)
      ) {
        const stat = await this.doSendChannelNotification(
          notificationType,
          channel,
          message,
          subject,
          recipient,
          company,
        );
        resp.status = stat;
        resp.message = stat
          ? 'Notification sent'
          : 'Failed to send notification';
      }
    });

    return resp;
  }

  private async doSendChannelNotification(
    type: string,
    channel: string,
    message: string,
    subject: string,
    recipient: User,
    company: Company,
  ): Promise<boolean> {
    let status = false;
    switch (channel) {
      case 'Email': {
        console.log('------------------Email Start-----------------');
        console.log('Email Recipient: ', `${recipient.email}`);
        console.log('Email Subject: ', `${subject}`);
        console.log('Email Message: ', `${message}`);
        console.log('------------------Email End-------------------');
        status = true;
        break;
      }
      case 'UI': {
        const notification: UINotification = {
          userId: recipient.id,
          companyId: company.id,
          notificationType: type,
          message: message,
          subject: subject,
        };
        const created = await this.createNotification(notification);
        status = created.id && created.id !== null;
        break;
      }
      default: {
        status = false;
        break;
      }
    }
    return status;
  }

  isUserSubscribedToChannel(channel: string, recipient: User): boolean {
    return recipient.subscribedChannels.includes(channel);
  }

  isCompanySubscribedToChannel(channel: string, company: Company): boolean {
    return company.subscribedChannels.includes(channel);
  }

  async createNotification(notification: UINotification) {
    const created = new this.notificationModel(notification);
    return await created.save();
  }

  async listNotifications(): Promise<UINotification[] | null> {
    return await this.notificationModel.find().exec();
  }

  async listUserNotifications(
    userId: number,
  ): Promise<UINotification[] | null> {
    return await this.notificationModel.find({ userId: userId }).exec();
  }
}
