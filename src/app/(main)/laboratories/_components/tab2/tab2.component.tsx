/* Component imports */
import CreateButton from "@/app/_components/buttons/create-button.component";
import LabansTable from "./components/labans-table.component";
/* Other libraries imports */
import { Flex } from "antd";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Response imports */
import FindLabanData from "@/responses/laboratories-analyses/find-laban-data.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* Tab2 */
const Tab2: React.FC<{
  data: GenericSuccessResponse<FindLabanData>;
  setLaban: Dispatch<SetStateAction<FindLabanData | undefined>>;
  setShowCreateModal: Dispatch<SetStateAction<boolean>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  return (
    <Flex gap="middle" vertical>
      <CreateButton onClick={() => props.setShowCreateModal(true)} />

      <LabansTable
        data={props.data}
        setLaban={props.setLaban}
        setShowDeleteModal={props.setShowDeleteModal}
        setShowUpdateModal={props.setShowUpdateModal}
      />
    </Flex>
  );
};

export default Tab2;
