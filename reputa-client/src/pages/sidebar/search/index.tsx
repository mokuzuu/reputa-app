import * as React from "react";
import SvgSearch from "assets/svgSearch";
import { search, useSearchDispatch } from "context";
import { useSearchState } from "context";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
interface Props { }
const Index: React.FC<Props> = () => {
  const [searchWord, setSearchWord] = React.useState<string>("");
  const state = useSearchState();
  const dispatch = useSearchDispatch();

  return (
    <div
      css={[
        css`
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        `
      ]}
    >
      <div
        css={[
          css`
          margin: 5% 0 5% 0;
        `
        ]}
      >
        <b>Reputa</b>
      </div>
      <div
        css={[
          css`
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            height: 13%;
            width: 80%;
            font-size: 8px;
          `
        ]}
      >
        <input
          placeholder="Enter search query here"
          css={[
            css`
              border-radius: 3px;
              border-style: none;
              height: 100%;
              width: 80%;
            `
          ]}
          value={searchWord}
          onChange={e => {
            setSearchWord(e.target.value)
          }}
        />

        <div
          css={[
            css`
              width: 30px;
              height: 30px;
              border-radius: 10px;
              background-color: rgb(221, 221, 221, 0.5);
              cursor: pointer;
            `
          ]}
          onClick={(e: any) => {
            if (!state.isSearching) {
              search(dispatch, searchWord);
            }
          }}
        >
          <SvgSearch />
        </div>
      </div>
    </div>
  );
};
export default Index;
