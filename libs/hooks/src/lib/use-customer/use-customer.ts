import { useState } from 'react';
/* eslint-disable-next-line */
export interface UseCustomerProps {}

export function UseCustomer(props?: UseCustomerProps) {
  const [customer, setCustomer] = useState();
  return {
    customer,
  };
}
