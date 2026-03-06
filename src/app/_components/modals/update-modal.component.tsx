/* Icons import */
import Icons from "../icons/icons";
/* Other libraries imports */
import { Form, FormInstance, FormProps, Modal, Spin } from "antd";
/* React imports */
import { Dispatch, ReactNode, SetStateAction } from "react";
/* UpdateModal */
const UpdateModal: React.FC<{
  children: ReactNode;
  form: FormInstance;
  instanceName: string | undefined;
  loading: boolean;
  onFinish: FormProps["onFinish"];
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
  showUpdateModal: boolean;
}> = (props) => (
  <Modal
    cancelButtonProps={{
      color: "danger",
      variant: "link",
    }}
    cancelText={Icons.cancel}
    centered
    closeIcon={false}
    destroyOnHidden
    maskClosable={false}
    modalRender={(node) => (
      <Form
        clearOnDestroy
        form={props.form}
        layout="horizontal"
        onFinish={props.onFinish}
      >
        {node}
      </Form>
    )}
    okButtonProps={{
      color: "green",
      htmlType: "submit",
      variant: "link",
    }}
    okText={props.loading ? <Spin /> : Icons.ok}
    onCancel={() => props.setShowUpdateModal(false)}
    open={props.showUpdateModal}
    title={`Atualizar ${props.instanceName}`}
  >
    {props.children}
  </Modal>
);

export default UpdateModal;
