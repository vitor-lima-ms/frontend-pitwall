/* Component imports */
import CreateButton from "@/app/_components/buttons/create-button.component";
import TpsTable from "./components/tps-table.component";
/* Context imports */
import TpContext from "../../_context/tp-context";
/* Other libraries imports */
import { Flex } from "antd";
/* React imports */
import { useContext } from "react";
/* Tab1 */
const Tab1: React.FC = () => {
  /**
   * Context.
   */
  const context = useContext(TpContext);
  /**
   *
   */

  return (
    <Flex gap="middle" vertical>
      <CreateButton onClick={() => context!.setShowTpCreateModal(true)} />

      <TpsTable />
    </Flex>
  );
};

export default Tab1;
