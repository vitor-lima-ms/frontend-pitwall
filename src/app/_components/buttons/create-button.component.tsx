/* Icons imports */
import Icons from "../icons/icons";
/* Other libraries imports */
import { Button, ButtonProps, Tooltip } from "antd";
/* CreateButton */
const CreateButton: React.FC<{
  innerText?: React.ReactNode;
  onClick: ButtonProps["onClick"];
}> = (props) => {
  return (
    <Tooltip title="Criar" placement="right">
      <Button
        color="primary"
        icon={Icons.create}
        onClick={props.onClick}
        style={{ padding: 0 }}
        variant="link"
      >
        {props.innerText}
      </Button>
    </Tooltip>
  );
};

export default CreateButton;
