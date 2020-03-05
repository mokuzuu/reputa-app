import React from "react";
import style from "./style";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import SideBar from "./pages/sidebar";
import Main from "./pages/main";
import { SearchProvider } from "context";
function App() {
  return (
    <SearchProvider>
      <div css={[style.app]}>
        <div css={[style.sideMenu]}>
          <SideBar />
        </div>
        <div css={[style.main]}>
          <Main />
        </div>
      </div>
    </SearchProvider>
  );
}

export default App;
