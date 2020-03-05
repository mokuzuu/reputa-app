import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useSearchState } from "context";
import Tweet from "./tweet";
interface Props {
  height: number;
}
/**
 * Display tweets
 * @param height height size of parent component 
 */
const Index: React.FC<Props> = ({ height }) => {
  const state = useSearchState();
  return (
    <div
      css={[
        css`
          width: 90%;
          height: ${height - 30}px;
          overflow-y: scroll;
          ::-webkit-scrollbar {
            display: none;
        }
        `
      ]}
    >
      {state.result &&
        state.result.tweets.map((content, idx) => (
          <Tweet
            key={idx}
            tweet={content.text}
            positiveWords={content.positive_words}
            negativeWords={content.negative_words}
          />
        ))}
    </div>
  );
};
export default Index;
