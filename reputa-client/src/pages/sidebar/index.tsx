import * as React from "react";
import Search from "./search";
import Tweets from "./tweets";
import style from "./style";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
interface Props { }
/**
 * Side bar which includes search bar and tweets
 */
const Index: React.FC<Props> = () => {
  const tweetsColumnRef = React.useRef<HTMLDivElement>(null);
  const [tweetsColumnHeight, setTweetsColumnHeight] = React.useState(0);
  React.useEffect(() => {
    setTweetsColumnHeight(document.documentElement.clientHeight - 200)
    window.addEventListener("resize", () => {
      setTweetsColumnHeight(document.documentElement.clientHeight - 200)
    })
  }, []);
  return (
    <div css={[style.container]}>
      <div
        css={[
          css`
            width: 100%;
            flex-basis: 200px;
            min-height: 200px;
          `
        ]}
      >
        <Search />
      </div>
      <div
        css={[
          css`
            width: 100%;
            flex-basis: auto;
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 10px;
          `
        ]}
        ref={tweetsColumnRef}
      >
        <Tweets height={tweetsColumnHeight} />
      </div>
    </div>
  );
};
export default Index;
