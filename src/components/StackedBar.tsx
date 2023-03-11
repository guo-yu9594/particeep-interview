export type mapStringNumber = { [key: string]: number };

export interface StackedBarProps {
  data: mapStringNumber;
  style?: React.CSSProperties;
}

const stackedBarDefaultStyle: React.CSSProperties = {
  position: "relative",
  borderRadius: "10000px",
  backgroundColor: "#3c00ff",
};

const convertToPercentage = (data: mapStringNumber): mapStringNumber => {
  let max = 0;
  let res: mapStringNumber = {};

  for (let key in data) max += data[key];
  for (let key in data) res[key] = (data[key] / max) * 100;
  return res;
};

const getBarsByPercentages = (percentages: mapStringNumber): JSX.Element[] => {
  const color: string[] = ["#3c00ff", "red"];
  let x = 0;
  let res: JSX.Element[] = [];
  let i = 0;

  for (let key in percentages) {
    if (percentages[key] > 0.5) {
      res.push(
        <div
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

const StackedBar = ({ data, style }: StackedBarProps): JSX.Element => {
  const stackedBarStyle = {
    ...stackedBarDefaultStyle,
    ...style,
  };
  const percentages: mapStringNumber = convertToPercentage(data);
  const bars: JSX.Element[] = getBarsByPercentages(percentages);

  return <div style={stackedBarStyle}>{bars}</div>;
};

export default StackedBar;
