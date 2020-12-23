import { injectable } from 'inversify';

export interface FetchService {
  get<T>(data: T): Promise<T>;
  put<T>(data: T): Promise<T>;
}

@injectable()
export class FetchService implements FetchService {
  static timeout = 200;

  // eslint-disable-next-line class-methods-use-this
  public get<T>(data: T) {
    return new Promise<T>((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, FetchService.timeout);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public put<T>(data: T) {
    return new Promise<T>((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, FetchService.timeout);
    });
  }
}
