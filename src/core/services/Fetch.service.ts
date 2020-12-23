import { injectable } from 'inversify';

export interface FetchService {
  get<T>(data: T): Promise<T>;
  put<T>(data: T): Promise<T>;
};

@injectable()
export class FetchService implements FetchService {
  static timeout = 200;

  public get<T>(data: T) {
    return new Promise<T>((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, FetchService.timeout);
    });
  }

  public put<T>(data: T) {
    return new Promise<T>((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, FetchService.timeout);
    });
  }
}