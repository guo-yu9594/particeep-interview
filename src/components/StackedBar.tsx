import * as Data from "../interfaces/Data"

const stackedBarDefaultStyle: React.CSSProperties = {
  position: "relative",
  borderRadius: "10000px",
  backgroundColor: "#3c00ff",
};

const convertToPercentage = (data: Data.mapStringNumber): Data.mapStringNumber => {
  let max = 0;
  let res: Data.mapStringNumber = {};

  for (let key in data) max += data[key];
  for (let key in data) res[key] = (data[key] / max) * 100;
  return res;
};

const getBarsByPercentages = (percentages: Data.mapStringNumber): JSX.Element[] => {
  const color: string[] = ["#3c00ff", "red"];
  let x = 0;
  let res: JSX.Element[] = [];
  let i = 0;

  for (let key in percentages) {
    if (percentages[key] > 0.5) {
      res.push(
        <div
        key={i}
          style={{
            position: "absolute",
            backgroundColor: color[i % 2],
            height: "100%",
            borderRadius: "10000px",
            width: percentages[key] + "%",
            left: x + "%",
          }}
        ></div>
      );
      x += percentages[key];
      i++;
    }
  }

  return res;
};

export interface StackedBarProps {
  data: Data.mapStringNumber;
  style?: React.CSSProperties;
}

const StackedBar = ({ data, style }: StackedBarProps): JSX.Element => {
  const stackedBarStyle = {
    ...stackedBarDefaultStyle,
    ...style,
  };
  const percentages: Data.mapStringNumber = convertToPercentage(data);
  const bars: JSX.Element[] = getBarsByPercentages(percentages);

  return <div style={stackedBarStyle}>{bars}</div>;
};

export default StackedBar;
