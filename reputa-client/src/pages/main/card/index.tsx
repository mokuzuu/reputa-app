import * as React from "react";
import style from "./style";
import { GraphType } from "../graphType";
import { Doughnut } from "react-chartjs-2";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
/**
 * Card component which includes search word and created graph based on search result
 */
interface Props {
  positivity: number;
  neutral: number;
  negativity: number;
  name: string;
  description: string;
  type: GraphType;
}
const Index: React.FC<Props> = ({
  name,
  description,
  positivity,
  neutral,
  negativity
}) => {
  return (
    <div css={[style.card]}>
      <div
        css={[
          css`
            flex-basis: 30%;
            width: 100%;
            padding-left: 5%;
          `
        ]}
      >
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div
        css={[
          css`
            flex-basis: 70%;
            width: 100%;
          `
        ]}
      >
        <Doughnut
          data={{
            datasets: [
              {
                data: [Math.round(positivity * 100), Math.round(neutral * 100), Math.round(negativity * 100)],
                backgroundColor: ["#de3f3a", "#ddd", "#4c67ed"]
              }
            ],
            labels: ["Positive", "Neutral", "Negative"]
          }}
        />
      </div>
    </div>
  );
};
export default Index;
