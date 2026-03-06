/* Icons imports */
import Icons from "../icons/icons";
/* Other libraries imports */
import { Button, ButtonProps, Tooltip } from "antd";
/* ImportButton */
const ImportButton: React.FC<{
  innerText?: React.ReactNode;
  onClick: ButtonProps["onClick"];
  tooltipTitle: string;
}> = (props) => {
  return (
    <Tooltip title={props.tooltipTitle} placement="right">
      <Button
        color="primary"
        icon={Icons.import}
        onClick={props.onClick}
        style={{ padding: 0 }}
        variant="link"
      >
        {props.innerText}
      </Button>
    </Tooltip>
  );
};

export default ImportButton;
