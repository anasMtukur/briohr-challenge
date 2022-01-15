import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { CompanyService } from 'src/company/company.service';
import { ResponseMessage } from 'src/dto/response';
import { NotificationTypeService } from 'src/notification-type/notification-type.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { CompanyModule } from 'src/company/company.module';
import { NotificationTypeModule } from 'src/notification-type/notification-type.module';
import { NotificationModule } from './notification.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { UINotification } from './notification.model';
import { mongoose } from '@typegoose/typegoose';

describe('NotificationService', () => {
  let service: NotificationService;
  let userService: UserService;
  let companyService: CompanyService;
  let notificationTypeService: NotificationTypeService;
  const userId = '1',
    companyId = '1111',
    notification = 'happy-birthday';
  let response, success: ResponseMessage;
  const url = process.env.MONGO_URL || 'localhost';
  const username = process.env.MONGO_USERNAME || 'root';
  const password = process.env.MONGO_PASSWORD || 'pass12345';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        CompanyModule,
        NotificationTypeModule,
        NotificationModule,
        TypegooseModule.forRoot(
          `mongodb://${username}:${password}@${url}:27017?serverSelectionTimeoutMS=2000&authSource=admin`,
        ),
        TypegooseModule.forFeature([UINotification]),
      ],
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

  afterAll((done) => {
    mongoose.connection.close();
    done();
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

  it('should return an array of UINotifications For User', async () => {
    const result = [];
    jest
      .spyOn(service, 'listUserNotifications')
      .mockImplementation(async () => result);

    expect(await service.listUserNotifications(Number(userId))).toBe(result);
  });
});
