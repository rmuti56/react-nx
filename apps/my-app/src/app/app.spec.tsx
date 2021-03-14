import React from 'react';
import { render } from '@testing-library/react';

import App from './app';
import { Provider } from 'react-redux';
import { store } from '@react-app/store';

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />, { wrapper: Wrapper });

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />, { wrapper: Wrapper });

    expect(getByText('Welcome to my-app!')).toBeTruthy();
  });
});
