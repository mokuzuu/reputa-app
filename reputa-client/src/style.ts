import { css } from "@emotion/core";

const app = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;
const sideMenu = css`
  min-width: 400px;
  max-width: 400px;
  height: 100%;
`;
const main = css`
  flex-basis: auto;
  flex-grow: 1;
  height: 100%;
`;
export default {
  app,
  sideMenu,
  main
};
