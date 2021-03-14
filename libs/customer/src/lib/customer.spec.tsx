import React from 'react';
import { render } from '@testing-library/react';

import Customer from './customer';

describe('Customer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Customer />);
    expect(baseElement).toBeTruthy();
  });
});
