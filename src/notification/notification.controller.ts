import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { NewNotification } from 'src/dto/new-notification';
import { NotificationTypeService } from 'src/notification-type/notification-type.service';
import { UserService } from 'src/user/user.service';
import { UINotification } from './notification.model';
import { NotificationService } from './notification.service';
import { Response } from 'express';
import { ResponseMessage } from 'src/dto/response';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
    private readonly notificationTypeService: NotificationTypeService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post('send')
  async createNotification(
    @Body() newNotification: NewNotification,
    @Res() response: Response,
  ) {
    let message: ResponseMessage = {};
    const user = await this.userService.getUser(newNotification.userId);
    if (!user) {
      message = {
        status: false,
        message: 'User does not exist',
      };
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
    }

    const company = await this.companyService.getCompany(
      newNotification.companyId,
    );
    if (!company) {
      message = {
        status: false,
        message: 'Company does not exist',
      };
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
    }

    const notificationType = await this.notificationTypeService.getNotification(
      newNotification.notificationType,
    );
    if (!notificationType) {
      message = {
        status: false,
        message: 'Notification Type is not allowed',
      };
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
    }

    const created = await this.notificationService.sendNotification(
      user,
      company,
      notificationType,
    );
    response.status(HttpStatus.CREATED).send(created);
    //return await this.notificationService.createNotification(notification);
  }

  @Get('/user/:userId')
  async getUserNotifcation(@Param('userId') userId) {
    const uid = Number(userId);
    const user = await this.notificationService.listUserNotifications(uid);
    return user;
  }
}
