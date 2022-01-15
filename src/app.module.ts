import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { UserService } from './user/user.service';
import { CompanyService } from './company/company.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { NotificationTypeModule } from './notification-type/notification-type.module';
import { NotificationTypeService } from './notification-type/notification-type.service';
import { NotificationModule } from './notification/notification.module';

const url = process.env.MONGO_URL || 'localhost';
const username = process.env.MONGO_USERNAME || 'root';
const password = process.env.MONGO_PASSWORD || 'pass12345';
@Module({
  imports: [
    UserModule,
    CompanyModule,
    TypegooseModule.forRoot(
      `mongodb://${username}:${password}@${url}:27017?serverSelectionTimeoutMS=2000&authSource=admin`,
    ),
    NotificationTypeModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    CompanyService,
    NotificationTypeService,
    NotificationModule,
  ],
})
export class AppModule {}
