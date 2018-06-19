// @flow
import React, { Component, type ComponentType } from 'react';
import { makeCancelable, type CancelablePromise } from '../utils/promiseUtils';

type Data = {} | [];
type FetchError = string | {};

export type DataFetcherProps = {
  data: ?Data,
  isLoading: boolean,
  error: ?FetchError,
};

export const getDisplayName = (WrappedComponent: ComponentType<any>): string =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

type Action<Props> = Props => Promise<any>;

type ComposedComponentType<Props> = ComponentType<Props & DataFetcherProps>;

type WrapperFunction<Props> = (
  ComposedComponentType<Props>
) => ComponentType<Props>;

function dataFetcherWrapper<Props: {}>(
  action: Action<Props>
): WrapperFunction<Props> {
  return (ComposedComponent: ComposedComponentType<Props>) => {
    class DataFetcher extends Component<Props, DataFetcherProps> {
      cancelablePromise: null | CancelablePromise<any> = null;
      state = {
        data: null,
        isLoading: false,
        error: null,
      };

      componentDidMount() {
        const { data, error } = this.state;
        if (!data && !error) this.fetchData(this.props);
      }

      componentDidUpdate() {
        const { data, error, isLoading } = this.state;
        if (!data && !error && !isLoading) this.fetchData(this.props);
      }

      componentWillUnmount() {
        if (this.cancelablePromise) this.cancelablePromise.cancel();
      }

      async fetchData(props: Props): Promise<void> {
        try {
          this.startLoading();
          this.cancelablePromise = makeCancelable(action(props));
          const data: Data = await this.cancelablePromise.promise;
          this.updateData(data);
        } catch (error) {
          if (error && error.isCanceled) return;
          this.updateError(error);
        }
      }

      updateData = (data: Data): void => {
        this.setState({
          isLoading: false,
          data,
        });
      };

      updateError = (error: Error): void => {
        this.setState({
          isLoading: false,
          error,
        });
      };

      startLoading = (): void => {
        this.setState({
          isLoading: true,
        });
      };

      render() {
        const { data, isLoading, error } = this.state;
        return (
          <ComposedComponent
            data={data}
            isLoading={isLoading}
            error={error}
            {...this.props}
          />
        );
      }
    }

    DataFetcher.displayName = `DataFetcher(${getDisplayName(
      ComposedComponent
    )})`;

    return DataFetcher;
  };
}

export default dataFetcherWrapper;
