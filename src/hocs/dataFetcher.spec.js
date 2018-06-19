// @flow
import React from 'react';
import { mount } from 'enzyme';
import dataFetcher from './dataFetcher';

/* I don't really like mocking this way
maybe consider changing implementation for dataFetcher
*/
jest.mock('../utils/promiseUtils', () => ({
  makeCancelable: jest.fn(id => ({
    promise: id,
  })),
}));

describe('dataFetcher tests', () => {
  test('happy path', async () => {
    const mockData = [{ test: '1' }];
    const promise = Promise.resolve(mockData);
    const mockAction = () => promise;
    const TestComponent = () => <div />;
    const DataFetcherComponent = dataFetcher(mockAction)(TestComponent);
    const wrapper = mount(<DataFetcherComponent />);
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

  test('promise rejected', async () => {
    const mockError = 'error';
    const promise = Promise.reject(mockError);
    const mockAction = () => promise;
    const TestComponent = () => <div />;
    const DataFetcherComponent = dataFetcher(mockAction)(TestComponent);
    const wrapper = mount(<DataFetcherComponent />);
    expect(wrapper.find(TestComponent).props()).toEqual({
      data: null,
      isLoading: true,
      error: null,
    });
    try {
      await promise;
    } catch (err) {
      wrapper.update();
      expect(wrapper.find(TestComponent).props()).toEqual({
        data: null,
        error: mockError,
        isLoading: false,
      });
    }

    promise.catch(() => {});
  });
});
