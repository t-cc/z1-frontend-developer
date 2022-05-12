import React from "react";
import styled from "styled-components";
import { STATUS_TYPE_ACCEPTED } from "../../constants/status";

interface Props {
  statusType: string;
  statusText: string;
}

const Button = styled.button`
  color: white;
  height: 1.875rem;
  position: absolute;
  border: none;
  border-radius: 0.3125rem;
  bottom: -0.9375rem;
  margin-left: 4rem;
`;

export const StatusButton: React.FC<Props> = ({ statusType, statusText }) => {
  const color = statusType === STATUS_TYPE_ACCEPTED ? "green" : "red";
  return <Button style={{ background: color }}>{statusText}</Button>;
};
