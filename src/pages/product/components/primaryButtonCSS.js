/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export function PrimaryButton(props) {
  return (
    <button
      css={css`
        background-color: red;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background-color: darkblue;
        }
      `}
      {...props}
    />
  );
}
