/* Icons import */
import Icons from "../icons/icons";
/* Other libraries imports */
import { Button, ButtonProps, Tooltip } from "antd";
/* CancelButton */
const CancelButton: React.FC<{
  onClick: ButtonProps["onClick"];
}> = (props) => (
  <Tooltip placement="bottom" title="Cancelar">
    <Button
      color="danger"
      icon={Icons.cancel}
      onClick={props.onClick}
      variant="link"
    />
  </Tooltip>
);

export default CancelButton;
