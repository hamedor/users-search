import { Employee } from '@/entites/employee/model/employee';
import ApiService from '@/shared/api/ApiService';


class EmployeesService extends ApiService {
  constructor() {
    super('https://jsonplaceholder.typicode.com');
  }

  async getUsersByUsername(usernames: string[]): Promise<Employee[]> {
    if (usernames.length === 0) return [];
    const response = await this.get<Employee[]>('/users', {
      params: { 'username[]': usernames },
    });
    return response;
  }

  async getUsersById(ids: string[]): Promise<Employee[]> {
    if (ids.length === 0) return [];
    const response = await this.get<Employee[]>('/users', {
      params: { 'id[]': ids },
    });
    return response;
  }
}

export default new EmployeesService();
