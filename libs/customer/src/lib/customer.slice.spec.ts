import {
  fetchCustomer,
  customerAdapter,
  customerReducer,
} from './customer.slice';

describe('customer reducer', () => {
  it('should handle initial state', () => {
    const expected = customerAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(customerReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchCustomers', () => {
    let state = customerReducer(undefined, fetchCustomer.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = customerReducer(
      state,
      fetchCustomer.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = customerReducer(
      state,
      fetchCustomer.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
