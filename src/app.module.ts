import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { UserService } from './user/user.service';
import { CompanyService } from './company/company.service';

@Module({
  imports: [UserModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService, UserService, CompanyService],
})
export class AppModule {}
