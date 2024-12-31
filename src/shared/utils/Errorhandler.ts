import { ErrorMessages } from '@/features/errors/model/errorMessages';
import axios, { AxiosError } from 'axios';
import store from '@/store'


class ErrorHandler {
  static handle(error: unknown) {
    console.error('Ошибка:', error);

    let errorMessage = ErrorMessages.UNKNOWN_ERROR;

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const status = axiosError.response.status;
        switch (status) {
          case 400:
            errorMessage = ErrorMessages.BAD_REQUEST;
            break;
          case 500:
            errorMessage = ErrorMessages.INTERNAL_SERVER_ERROR;
            break;
          default:
            errorMessage = ErrorMessages.UNKNOWN_ERROR;
        }
      } 
    } 
    store.dispatch('error/addError', errorMessage);
  }
}

export default ErrorHandler;