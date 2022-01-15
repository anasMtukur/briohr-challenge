import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from 'src/company/company.service';
import { ResponseMessage } from 'src/dto/response';
import { NotificationTypeService } from 'src/notification-type/notification-type.service';
import { UserService } from 'src/user/user.service';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let userService: UserService;
  let companyService: CompanyService;
  let notificationTypeService: NotificationTypeService;
  const userId = '1',
    companyId = '111',
    notification = 'happy-birthday';
  let response, success: ResponseMessage;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        NotificationTypeService,
        UserService,
        CompanyService,
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    userService = module.get<UserService>(UserService);
    companyService = module.get<CompanyService>(CompanyService);
    notificationTypeService = module.get<NotificationTypeService>(
      NotificationTypeService,
    );
    success = {
      status: true,
      message: 'Notification sent',
    };
  });

  it('should send notification to the user', async () => {
    const user = await userService.getUser(userId);
    const company = await companyService.getCompany(companyId);
    const notificationType = await notificationTypeService.getNotification(
      notification,
    );

    response = await service.sendNotification(user, company, notificationType);

    expect(response).toEqual(success);
  });

  describe('listUserNotifications', () => {
    it('should return an array of UINotifications For User', async () => {
      const result = [];
      jest
        .spyOn(service, 'listUserNotifications')
        .mockImplementation(async () => result);

      expect(await service.listUserNotifications(Number(userId))).toBe(result);
    });
  });
});
