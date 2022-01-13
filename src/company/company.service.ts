import { HttpException, Injectable } from '@nestjs/common';
import { COMPANIES } from 'src/mocks/company.mock';

@Injectable()
export class CompanyService {
  companies = COMPANIES;

  getCompanies(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.companies);
    });
  }

  getCompany(companyID): Promise<any> {
    const id = Number(companyID);
    return new Promise((resolve) => {
      const company = this.companies.find((company) => company.id === id);
      if (!company) {
        throw new HttpException('Company does not exist!', 404);
      }
      resolve(company);
    });
  }
}
