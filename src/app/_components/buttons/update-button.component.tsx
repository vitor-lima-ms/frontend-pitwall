/* Icons import */
import Icons from "../icons/icons";
/* Other libraries imports */
import { Button, ButtonProps, Tooltip } from "antd";
/* UpdateButton */
const UpdateButton: React.FC<{
  onClick: ButtonProps["onClick"];
}> = (props) => (
  <Tooltip title="Atualizar" placement="left">
    <Button
      color="blue"
      icon={Icons.update}
      onClick={props.onClick}
      variant="link"
    />
  </Tooltip>
);

export default UpdateButton;
