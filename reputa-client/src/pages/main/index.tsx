import React from "react";
import Card from "./card";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { GraphType } from "./graphType";
import { useSearchState } from "context";
import { ClipLoader } from "react-spinners";

interface Props { }
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
/**
 * Display graph with search result
 */
const Index: React.FC<Props> = () => {
  const state = useSearchState();
  return (
    <div
      css={[
        css`
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
          overflow-y: scroll;
        `
      ]}
    >
      {state.isSearching ? (
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={true}
        />
      ) : (
          <React.Fragment>
            {state.result !== null && (
              <React.Fragment>
                <Card
                  name={`search word: ${state.searchWord}`}
                  description=""
                  type={GraphType.PIE_CHART}
                  positivity={state.result.positive_rate}
                  neutral={state.result.neutral_rate}
                  negativity={state.result.negative_rate}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
    </div>
  );
};
export default Index;
