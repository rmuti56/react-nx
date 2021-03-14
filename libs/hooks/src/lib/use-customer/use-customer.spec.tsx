import { UseCustomer } from './use-customer';

describe('UseCustomer', () => {
  it('should work', () => {
    expect(UseCustomer()).toMatchObject({ customer: undefined });
  });
});
