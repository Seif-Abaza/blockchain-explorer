// @flow

export type CancelablePromise<T> = {
  promise: Promise<T>,
  cancel: () => void,
};

export const makeCancelable = <T>(
  promise: Promise<T>
): CancelablePromise<T> => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (val: any) =>
        hasCanceled_ ? reject({ isCanceled: true }) : resolve(val),
      (error: any) =>
        hasCanceled_ ? reject({ isCanceled: true }) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};
