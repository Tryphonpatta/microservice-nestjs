import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('RMQ_SERVICE') private readonly client: ClientProxy) {}
  getHello(): string {
    return 'Hello World!';
  }

  async test() {
    try {
      const response = await firstValueFrom(
        this.client.send('test', [1, 2, 3]),
      );
      return await response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
