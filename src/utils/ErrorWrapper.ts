import { AxiosError } from 'axios'

export class ErrorWrapper extends Error {
  public success: boolean
  public meta: any
  public code: number | false
  public status: number | false
  public statusMessage: string
  public message: string

  constructor(error: AxiosError, message: string) {
    super()
    this.success = error.response ? error.response.data.success : false
    this.meta = error.response ? error.response.data.meta : false
    this.code = error.response ? error.response.data.code : false
    this.status = error.response ? error.response.status : false
    this.statusMessage = this._getStatusMessage(this.status)
    this.message = message || this._getResponseErrorMessage(error)
  }

  private _getResponseErrorMessage(error: AxiosError<any>): string {
    if (error.response?.data) return error.response.data.message
    if (error.response?.statusText) return error.response.statusText

    return error.message === 'Network Error'
      ? 'Проблемы с сетью, попробуйте повторить позже'
      : error.message
  }

  private _getStatusMessage(status: number | boolean): string {
    switch (status) {
      case 200:
        return 'Все хорошо, запрос выполнен успешно'

      case 201:
        return 'Запись успешно создана'

      case 400:
        return 'Запрос был отвергнут сервером'

      case 401:
        return 'Необходима авторизация'

      case 404:
        return 'Не удалось найти запись'

      case 503:
        return 'Неполадки на сервере, зайдите позже'

      default:
        return 'Что-то пошло не так, попробуйте повторить позже'
    }
  }
}
