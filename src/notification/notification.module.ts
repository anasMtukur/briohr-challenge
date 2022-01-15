import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { UserModule } from 'src/user/user.module';
import { CompanyModule } from 'src/company/company.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { NotificationTypeModule } from 'src/notification-type/notification-type.module';
import { NotificationTypeService } from 'src/notification-type/notification-type.service';
import { UserService } from 'src/user/user.service';
import { CompanyService } from 'src/company/company.service';
import { UINotification } from './notification.model';

@Module({
  imports: [
    UserModule,
    CompanyModule,
    NotificationTypeModule,
    TypegooseModule.forFeature([UINotification]),
    NotificationModule,
  ],
  providers: [
    NotificationService,
    NotificationTypeService,
    UserService,
    CompanyService,
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
