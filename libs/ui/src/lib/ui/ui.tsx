import { Button, DatePicker } from 'antd';
import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UiProps {}

const StyledUi = styled.div`
  color: pink;
`;

export function Ui(props: UiProps) {
  return (
    <StyledUi>
      <h1>Welcome to ui!</h1>
      <Button type="primary">อ้ายเอ้ย</Button>
      <DatePicker />
    </StyledUi>
  );
}

export default Ui;
