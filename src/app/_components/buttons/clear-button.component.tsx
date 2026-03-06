/* Icons import */
import Icons from "../icons/icons";
/* Other libraries imports */
import { Button, ButtonProps, Tooltip } from "antd";
/* ClearButton */
const ClearButton: React.FC<{
  onClick: ButtonProps["onClick"];
}> = (props) => (
  <Tooltip placement="bottom" title="Limpar">
    <Button
      color="blue"
      icon={Icons.clear}
      onClick={props.onClick}
      variant="link"
    />
  </Tooltip>
);

export default ClearButton;
