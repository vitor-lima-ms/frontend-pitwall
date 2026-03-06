/* Component imports */
import CreateButton from "@/app/_components/buttons/create-button.component";
import GenericParametersTable from "./components/gps-table.component";
/* Context imports */
import GpContext from "../../_context/gp-context";
/* Other libraries imports */
import { Flex } from "antd";
/* React imports */
import { useContext } from "react";
/* Tab1 */
const Tab1: React.FC = () => {
  /**
   * Context.
   */
  const context = useContext(GpContext);
  /**
   *
   */

  return (
    <Flex gap="middle" vertical>
      <CreateButton onClick={() => context!.setShowGpCreateModal(true)} />

      <GenericParametersTable />
    </Flex>
  );
};

export default Tab1;
