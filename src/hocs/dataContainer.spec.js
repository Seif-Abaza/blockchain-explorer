import React from 'react';
import { mount } from 'enzyme';
import dataContainer from './dataContainer';

describe('dataContainer tests', () => {
  test('happy path', () => {
    const TestComponent = () => <div />;
    const mockAction = jest
      .fn()
      .mockReturnValue(Promise.resolve([{ test: '1' }]));
    const WrappedTestComponent = dataContainer(mockAction)(TestComponent);
    const wrapper = mount(<WrappedTestComponent />);
  });
});
