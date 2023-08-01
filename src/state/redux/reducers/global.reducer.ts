/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGlobalState } from 'common/interfaces';

export class GlobalReducer<T = any> {
  private _state: IGlobalState;
  private _payload: T;

  constructor(options: { state: IGlobalState; payload: T }) {
    this._state = options.state;
    this._payload = options.payload;
  }

  setTitle() {
    this._state.title = this._payload as string;
  }

  setLazyLoading() {
    this._state.lazyLoading = this._payload as boolean;
  }
}
