import { prop } from '@typegoose/typegoose';

enum Status {
  NEW = 'new',
  SEEN = 'seen',
}

export class UINotification {
  @prop({ required: true })
  userId?: number;

  @prop({ required: true })
  companyId?: number;

  @prop({ required: true })
  notificationType?: string;

  @prop({ required: false, default: 'none' })
  subject?: string;

  @prop({ required: true })
  message?: string;

  @prop({ default: Status.NEW })
  status?: string;
}
