import React from "react";
import { BeatLoader } from "react-spinners";
import styled from "@emotion/styled";

const Loading = () => {
  return (
    <LoadingWrap>
      <BeatLoader />
    </LoadingWrap>
  );
};
export default Loading;

const LoadingWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
