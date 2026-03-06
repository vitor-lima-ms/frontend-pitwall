/* Icons import */
import Icons from "../icons/icons";
/* Other libraries imports */
import { Button, ButtonProps, Tooltip } from "antd";
/* DeleteButton */
const DeleteButton: React.FC<{
  onClick: ButtonProps["onClick"];
}> = (props) => (
  <Tooltip title="Apagar" placement="left">
    <Button
      color="danger"
      icon={Icons.delete}
      onClick={props.onClick}
      variant="link"
    />
  </Tooltip>
);

export default DeleteButton;
