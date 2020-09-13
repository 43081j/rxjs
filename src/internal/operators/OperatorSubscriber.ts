/** @prettier */
import { Subscriber } from '../Subscriber';

export class OperatorSubscriber<T> extends Subscriber<T> {
  constructor(destination: Subscriber<any>, onNext?: (value: T) => void, onError?: (err: any) => void, onComplete?: () => void) {
    super(destination);
    if (onNext) {
      this._next = function (value: T) {
        try {
          onNext?.(value);
        } catch (err) {
          this._error(err);
        }
      };
    }
    if (onError) {
      this._error = function (err) {
        onError(err);
        this.unsubscribe();
      };
    }
    if (onComplete) {
      this._complete = function () {
        onComplete();
        this.unsubscribe();
      };
    }
  }
}
