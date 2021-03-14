import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const CUSTOMER_FEATURE_KEY = 'customer';

/*
 * Update these interfaces according to your requirements.
 */
export interface CustomerEntity {
  id: number;
}

export interface CustomerState extends EntityState<CustomerEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const customerAdapter = createEntityAdapter<CustomerEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchCustomer())
 * }, [dispatch]);
 * ```
 */
export const fetchCustomer = createAsyncThunk(
  'customer/fetchStatus',
  async (customerId: number, thunkAPI) => {
    console.log(customerId)
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getCustomers()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialCustomerState: CustomerState = customerAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
  }
);

export const customerSlice = createSlice({
  name: CUSTOMER_FEATURE_KEY,
  initialState: initialCustomerState,
  reducers: {
    add: customerAdapter.addOne,
    remove: customerAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state: CustomerState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchCustomer.fulfilled,
        (state: CustomerState, action: PayloadAction<CustomerEntity[]>) => {
          customerAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchCustomer.rejected, (state: CustomerState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const customerReducer = customerSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(customerActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const customerActions = customerSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllCustomer);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = customerAdapter.getSelectors();

export const getCustomerState = (rootState: unknown): CustomerState =>
  rootState[CUSTOMER_FEATURE_KEY];

export const selectAllCustomer = createSelector(getCustomerState, selectAll);

export const selectCustomerEntities = createSelector(
  getCustomerState,
  selectEntities
);
