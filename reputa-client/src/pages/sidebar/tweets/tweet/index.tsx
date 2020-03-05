import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
interface Props {
  positiveWords: string[];
  negativeWords: string[];
  tweet: string;
}
/**
 * Display tweet, which text might be hightlighted 
 * in red or blue, depending on the score of the word inside nice box
 * @param tweet tweet text
 * @param positiveWords positive words which are highlighted in red
 * @param negativeWords negative words which are highlighted in blue
 */
const Index: React.FC<Props> = ({ tweet, positiveWords, negativeWords }) => {
  const tailorText = (
    tweet: string,
    positiveWords: string[],
    negativeWords: string[]
  ) => {
    let newText: string = tweet;
    // Apply positive words effect
    positiveWords.map(w => {
      newText = newText.replace(
        new RegExp(`(${w})`, "igm"),
        `<span style='color:#de3f3a;'>${w}</span>`
      );
    });
    // Apply negative words effect
    negativeWords.map(w => {
      newText = newText.replace(
        new RegExp(`(${w})`, "igm"),
        `<span style='color:#4c67ed;'>${w}</span>`
      );
     
    });
    return {
      __html: newText
    };
  };
  return (
    <div
      css={[
        css`
          widh: 100%;
          min-height: 80px;
          border-radius: 5px;
          background-color: white;
        `
      ]}
    >
      <p
        dangerouslySetInnerHTML={tailorText(
          tweet,
          positiveWords,
          negativeWords
        )}
        css={[
          css`
          padding: 10px 10px 10px 10px;
          `
        ]}
      />
    </div>
  );
};
export default Index;
