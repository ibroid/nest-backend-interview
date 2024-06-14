/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  rootEndpoint(): object {
    return {
      message: 'This is root endpoint',
      status: 'success',
    };
  }
}
