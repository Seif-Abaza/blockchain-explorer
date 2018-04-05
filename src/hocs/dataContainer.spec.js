// @flow
import React from 'react';
import { mount } from 'enzyme';
import dataContainer from './dataContainer';

describe('dataContainer tests', () => {
  test('happy path', async () => {
    const mockData = [{ test: '1' }];
    const promise = Promise.resolve(mockData);
    const mockAction = () => promise;
    const TestComponent = () => <div />;
    const DataContainerComponent = dataContainer(mockAction)(TestComponent);
    const wrapper = mount(<DataContainerComponent />);
    expect(wrapper.find(TestComponent).props()).toEqual({
      data: null,
      isLoading: true,
      error: null,
    });
    await promise;
    wrapper.update();
    expect(wrapper.find(TestComponent).props()).toEqual({
      data: mockData,
      error: null,
      isLoading: false,
    });
  });
});
