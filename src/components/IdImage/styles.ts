import styled from "styled-components";
import {
  STATUS_TYPE_ACCEPTED,
  STATUS_TYPE_REJECTED,
} from "../../constants/status";

export const StyledImg = styled.img<idImage>`
  border-radius: 0.75rem;
  background-color: #ffffff;
  box-shadow: 0 0.625rem 1.25rem -0.375rem rgba(0, 0, 0, 0.15);
  border: 0.125rem solid transparent;
  ${({ statusType }) => {
    if (statusType === STATUS_TYPE_ACCEPTED) {
      return "border-color: green;";
    } else if (statusType === STATUS_TYPE_REJECTED) {
      return "border-color: red;";
    }
  }}
`;
