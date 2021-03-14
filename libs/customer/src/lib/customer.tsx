import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CustomerProps {}

const StyledCustomer = styled.div`
  color: pink;
`;

export function Customer(props: CustomerProps) {
  return (
    <StyledCustomer>
      <h1>Welcome to customer!</h1>
    </StyledCustomer>
  );
}

export default Customer;
