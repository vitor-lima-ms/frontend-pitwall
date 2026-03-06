/* Component imports */
import CreateButton from "@/app/_components/buttons/create-button.component";
import QsfgpsTable from "./components/table/qsfgp-table.component";
/* Context imports */
import GpContext from "../../_context/gp-context";
/* Other libraries imports */
import { Flex } from "antd";
/* React imports */
import { useContext } from "react";
/* Tab2 */
const Tab2: React.FC = () => {
  /**
   * Context.
   */
  const context = useContext(GpContext);
  /**
   *
   */

  return (
    <Flex gap="middle" vertical>
      <CreateButton onClick={() => context!.setShowQsfgpCreateModal(true)} />

      <QsfgpsTable />
    </Flex>
  );
};

export default Tab2;
