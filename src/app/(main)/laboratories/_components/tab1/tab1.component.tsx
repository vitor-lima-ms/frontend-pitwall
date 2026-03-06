/* Component imports */
import CreateButton from "@/app/_components/buttons/create-button.component";
import LaboratoriesTable from "./components/labs-table.component";
/* Other libraries imports */
import { Flex } from "antd";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Response imports */
import FindLaboratoryData from "@/responses/laboratories/find-lab-data.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* Tab1 */
const Tab1: React.FC<{
  data: GenericSuccessResponse<FindLaboratoryData>;
  setLab: Dispatch<SetStateAction<FindLaboratoryData | undefined>>;
  setShowCreateModal: Dispatch<SetStateAction<boolean>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowGenerateAnalysisRequestModal: Dispatch<SetStateAction<boolean>>;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
  showGenerateAnalysisRequestModal: boolean;
}> = (props) => {
  return (
    <Flex gap="middle" vertical>
      <CreateButton onClick={() => props.setShowCreateModal(true)} />

      <LaboratoriesTable
        data={props.data}
        setLab={props.setLab}
        setShowDeleteModal={props.setShowDeleteModal}
        setShowGenerateAnalysisRequestModal={
          props.setShowGenerateAnalysisRequestModal
        }
        setShowUpdateModal={props.setShowUpdateModal}
        showGenerateAnalysisRequestModal={
          props.showGenerateAnalysisRequestModal
        }
      />
    </Flex>
  );
};

export default Tab1;
