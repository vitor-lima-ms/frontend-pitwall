/* Icons import */
import Icons from "../icons/icons";
/* Other libraries imports */
import { Button, ButtonProps, Tooltip } from "antd";
/* SearchButton */
const SearchButton: React.FC<{
  onClick: ButtonProps["onClick"];
}> = (props) => (
  <Tooltip placement="bottom" title="Buscar">
    <Button
      color="green"
      icon={Icons.search}
      onClick={props.onClick}
      variant="link"
    />
  </Tooltip>
);

export default SearchButton;
