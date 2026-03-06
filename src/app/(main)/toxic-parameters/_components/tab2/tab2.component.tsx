/* Component imports */
import CreateButton from "@/app/_components/buttons/create-button.component";
import SotpsTable from "./components/table/sotps-table";
/* Context imports */
import TpContext from "../../_context/tp-context";
/* Other libraries imports */
import { Flex } from "antd";
/* React imports */
import { useContext } from "react";
/* Tab2 */
const Tab2: React.FC = () => {
  /**
   * Context.
   */
  const context = useContext(TpContext);
  /**
   *
   */

  return (
    <Flex gap="middle" vertical>
      <CreateButton onClick={() => context!.setShowSotpCreateModal(true)} />

      <SotpsTable />
    </Flex>
  );
};

export default Tab2;
