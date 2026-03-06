/* Component imports */
import DeleteButton from "../buttons/delete-button.component";
import UpdateButton from "../buttons/update-button.component";
/* Other libraries imports */
import { ButtonProps, Space } from "antd";
/* ActionsColumn */
const ActionsColumn: React.FC<{
  deleteOnClick: ButtonProps["onClick"];
  otherButtons?: React.ReactNode[];
  updateOnClick: ButtonProps["onClick"];
}> = (props) => (
  <Space size="large">
    <DeleteButton onClick={props.deleteOnClick} />

    <UpdateButton onClick={props.updateOnClick} />

    {props.otherButtons && props.otherButtons.map((otherButton) => otherButton)}
  </Space>
);

export default ActionsColumn;
