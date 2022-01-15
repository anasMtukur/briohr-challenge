import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CompanyService } from './company/company.service';
import { NotificationTypeService } from './notification-type/notification-type.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
    private readonly notificationTypeService: NotificationTypeService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users/')
  getUsers(): Promise<any> {
    return this.userService.getUsers();
  }

  @Get('/users/:userID')
  async getUser(@Param('userID') userID) {
    const user = await this.userService.getUser(userID);
    return user;
  }

  @Get('/companies/')
  getCompanies(): Promise<any> {
    return this.companyService.getCompanies();
  }

  @Get('/notification-type/:notificationType')
  async getNotifcationType(@Param('notificationType') notificationType) {
    const user = await this.notificationTypeService.getNotification(
      notificationType,
    );
    return user;
  }
}
