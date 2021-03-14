import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const AUTHENTICATION_FEATURE_KEY = 'authentication';

/*
 * Update these interfaces according to your requirements.
 */
export interface AuthenticationEntity {
  id: number;
}

export interface AuthenticationState extends EntityState<AuthenticationEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  isAuthenticated: boolean;
  error: string;
}

export const authenticationAdapter = createEntityAdapter<AuthenticationEntity>();

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
 *   dispatch(fetchAuthentication())
 * }, [dispatch]);
 * ```
 */
export const fetchAuthentication = createAsyncThunk(
  'authentication/fetchStatus',
  async (userId: string, thunkAPI) => {
    console.log(userId)
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getAuthentications()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialAuthenticationState: AuthenticationState = authenticationAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
    isAuthenticated: false,
  }
);

export const authenticationSlice = createSlice({
  name: AUTHENTICATION_FEATURE_KEY,
  initialState: initialAuthenticationState,
  reducers: {
    add: authenticationAdapter.addOne,
    remove: authenticationAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthentication.pending, (state: AuthenticationState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchAuthentication.fulfilled,
        (
          state: AuthenticationState,
          action: PayloadAction<AuthenticationEntity[]>
        ) => {
          authenticationAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchAuthentication.rejected,
        (state: AuthenticationState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const authenticationReducer = authenticationSlice.reducer;

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
 *   dispatch(authenticationActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const authenticationActions = authenticationSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllAuthentication);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = authenticationAdapter.getSelectors();

export const getAuthenticationState = (
  rootState: unknown
): AuthenticationState => rootState[AUTHENTICATION_FEATURE_KEY];

export const selectAllAuthentication = createSelector(
  getAuthenticationState,
  selectAll
);

export const selectAuthenticationEntities = createSelector(
  getAuthenticationState,
  selectEntities
);
