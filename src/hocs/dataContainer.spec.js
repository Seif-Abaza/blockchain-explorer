// @flow
import React from 'react';
import { mount } from 'enzyme';
import dataContainer from './dataContainer';

/* I don't really like mocking this way
maybe consider changing implementation for dataContainer
*/
jest.mock('../utils/promiseUtils', () => ({
  makeCancelable: jest.fn(id => ({
    promise: id,
  })),
}));

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

  test('promise rejected', () => {
    const mockError = 'error';
    const promise = Promise.reject(mockError);
    const mockAction = () => promise;
    const TestComponent = () => <div />;
    const DataContainerComponent = dataContainer(mockAction)(TestComponent);
    const wrapper = mount(<DataContainerComponent />);
    expect(wrapper.find(TestComponent).props()).toEqual({
      data: null,
      isLoading: true,
      error: null,
    });
    promise.catch(() => {
      wrapper.update();
      expect(wrapper.find(TestComponent).props()).toEqual({
        data: null,
        error: mockError,
        isLoading: false,
      });
    });
  });
});
