// @flow
import React, { Component, type ComponentType } from 'react';

type Data = any;
type Error = any;

type State = {
  data: Data,
  isLoading: boolean,
  error: Error,
};

type Props = {};

export const getDisplayName = (WrappedComponent: ComponentType<any>): string =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

const dataContainerWrapper = (action: any => Promise<any>) => (
  ComposedComponent: ComponentType<any>
) => {
  class DataContainer extends Component<Props, State> {
    displayName = '1';
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
        data && (
          <ComposedComponent
            data={data}
            isLoading={isLoading}
            error={error}
            {...this.props}
          />
        )
      );
    }
  }

  DataContainer.displayName = `DataContainer(${getDisplayName(
    ComposedComponent
  )})`;

  return DataContainer;
};

export default dataContainerWrapper;
