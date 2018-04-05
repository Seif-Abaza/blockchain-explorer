// @flow
import React, { Component, type ComponentType } from 'react';

type Data = {} | [];
type Error = string | {};

export type DataContainerProps = {
  data: ?Data,
  isLoading: boolean,
  error: ?Error,
};

export const getDisplayName = (WrappedComponent: ComponentType<any>): string =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

function dataContainerWrapper<Props: {}>(
  action: Props => Promise<any>
): (
  ComponentType<{ ...Props, ...DataContainerProps }>
) => ComponentType<Props> {
  return (
    ComposedComponent: ComponentType<{ ...Props, ...DataContainerProps }>
  ) => {
    class DataContainer extends Component<Props, DataContainerProps> {
      state = {
        data: null,
        isLoading: false,
        error: null,
      };

      componentDidMount() {
        const { data, error } = this.state;
        if (!data && !error) this.fetchData(this.props);
      }

      componentWillReceiveProps(nextProps: Props) {
        const { data, error } = this.state;
        if (!data && !error) this.fetchData(nextProps);
      }

      async fetchData(props: Props): Promise<void> {
        try {
          this.startLoading();
          const data = await action(props);
          this.updateData(data);
        } catch (error) {
          this.updateError(error);
        }
      }

      updateData = (data: any): void => {
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

    DataContainer.displayName = `DataContainer(${getDisplayName(
      ComposedComponent
    )})`;

    return DataContainer;
  };
}

export default dataContainerWrapper;
