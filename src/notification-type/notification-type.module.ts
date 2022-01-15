import { Module } from '@nestjs/common';
import { NotificationTypeService } from './notification-type.service';

@Module({
  providers: [NotificationTypeService],
})
export class NotificationTypeModule {}
