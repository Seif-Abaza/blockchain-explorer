import { makeCancelable } from './promiseUtils';

describe('makeCancelable tests', () => {
  test('cancels resolved promise', async () => {
    const promise = Promise.resolve('test');
    const cancelablePromise = makeCancelable(promise);
    cancelablePromise.cancel();
    cancelablePromise.promise.catch(({ isCanceled }) =>
      expect(isCanceled).toEqual(true)
    );
  });
});
