/* Component imports */
import CreateButton from "@/app/_components/buttons/create-button.component";
import SpsTable from "./components/table/sps-table.component";
/* Context imports */
import SpContext from "../../_context/sp-context";
/* Other libraries imports */
import { Flex } from "antd";
/* React imports */
import { useContext } from "react";
/* Tab1 */
const Tab1: React.FC = () => {
  /**
   * Context.
   */
  const context = useContext(SpContext);
  /**
   *
   */

  return (
    <Flex gap="middle" vertical>
      <CreateButton onClick={() => context!.setShowSpCreateModal(true)} />

      <SpsTable />
    </Flex>
  );
};

export default Tab1;
