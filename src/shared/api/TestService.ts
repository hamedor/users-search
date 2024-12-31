import ApiService from '@/shared/api/ApiService';


class TestService extends ApiService {
  constructor() {
    super('https://httpstat.us');
  }

  async getStatus500(): Promise<unknown> {
    const response = await this.get<unknown>('/500');
    return response;
  }

  async getStatus400(): Promise<unknown> {
    const response = await this.get<unknown>('/400');
    return response;
  }

}

export default new TestService();
