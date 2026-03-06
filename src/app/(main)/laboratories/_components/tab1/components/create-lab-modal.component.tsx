/* API imports */
import createLaboratory from "../../../_api/lab/create-lab";
/* Component imports */
import CreateModal from "@/app/_components/modals/create-modal.component";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { LaboratoryPropertiesEnum } from "@/enums/api/laboratories/lab-properties.enum";
import { PublicPlaceTypesEnum } from "@/enums/api/laboratories/public-place-types.enum";
import { SingularPagesNamesEnum } from "@/enums/ui/singular-pages-names.enum";
import { UfsEnum } from "@/enums/api/laboratories/ufs.enum";
/* Other libraries imports */
import { App, Form, Input, Select } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Request imports */
import CreateLaboratory from "@/requests/laboratories/create-lab.request";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* CreateLaboratoryModal */
const CreateLaboratoryModal: React.FC<{
  setCreateButtonIsClicked: Dispatch<SetStateAction<boolean>>;
  setErrorResponse: Dispatch<SetStateAction<GenericErrorResponse | undefined>>;
  setShowCreateModal: Dispatch<SetStateAction<boolean>>;
  showCreateModal: boolean;
}> = (props) => {
  /**
   * useSession.
   */
  const { data } = useSession();
  /**
   *
   */

  /**
   * useForm.
   */
  const [form] = Form.useForm();
  /**
   *
   */

  /**
   * Nomes para os campos de formulário.
   */
  const labCep: keyof CreateLaboratory = "labCep";
  
  const labCnpj: keyof CreateLaboratory = "labCnpj";
  
  const labCompanyName: keyof CreateLaboratory = "labCompanyName";
  
  const labEmail: keyof CreateLaboratory = "labEmail";
  
  const labLocalityName: keyof CreateLaboratory = "labLocalityName";
  
  const labMainContact: keyof CreateLaboratory = "labMainContact";
  
  const labPhone: keyof CreateLaboratory = "labPhone";
  
  const labPublicPlaceComplement: keyof CreateLaboratory =
    "labPublicPlaceComplement";
    
  const labPublicPlaceName: keyof CreateLaboratory = "labPublicPlaceName";
  
  const labPublicPlaceNumber: keyof CreateLaboratory = "labPublicPlaceNumber";
  
  const labPublicPlaceType: keyof CreateLaboratory = "labPublicPlaceType";
  
  const labUf: keyof CreateLaboratory = "labUf";
  /**
   *
   */

  /**
   * Antd App Wrapper.
   */
  const { message } = App.useApp();
  /**
   *
   */

  /**
   * Enviando os dados.
   */
  const { loading, run } = useRequest(
    () => createLaboratory(form.getFieldsValue(), data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          props.setCreateButtonIsClicked(true);

          props.setShowCreateModal(false);

          message.success(successResponse.data[0]);
        } else {
          props.setErrorResponse(data as GenericErrorResponse);
        }
      },
    },
  );
  /**
   *
   */

  return (
    <CreateModal
      form={form}
      loading={loading}
      onFinish={run}
      setShowCreateModal={props.setShowCreateModal}
      showCreateModal={props.showCreateModal}
      singularEntityName={SingularPagesNamesEnum.LABORATORY}
    >
      <Form.Item
        label={LaboratoryPropertiesEnum.COMPANY_NAME}
        name={labCompanyName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={LaboratoryPropertiesEnum.CNPJ}
        name={labCnpj}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={LaboratoryPropertiesEnum.EMAIL}
        name={labEmail}
        rules={[
          { message: FeedbackEnum.REQUIRED_FIELD, required: true },
          { message: "E-mail inválido", type: "email" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={LaboratoryPropertiesEnum.PHONE}
        name={labPhone}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={LaboratoryPropertiesEnum.MAIN_CONTACT}
        name={labMainContact}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={LaboratoryPropertiesEnum.CEP}
        name={labCep}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={LaboratoryPropertiesEnum.UF}
        name={labUf}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          options={Object.entries(UfsEnum).map(([_, value]) => ({
            label: value,
            value: value,
          }))}
        />
      </Form.Item>

      <Form.Item
        label={LaboratoryPropertiesEnum.LOCALITY_NAME}
        name={labLocalityName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={LaboratoryPropertiesEnum.PUBLIC_PLACE_TYPE}
        name={labPublicPlaceType}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          options={Object.entries(PublicPlaceTypesEnum).map(([_, value]) => ({
            label: value,
            value: value,
          }))}
        />
      </Form.Item>

      <Form.Item
        label={LaboratoryPropertiesEnum.PUBLIC_PLACE_NAME}
        name={labPublicPlaceName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={LaboratoryPropertiesEnum.PUBLIC_PLACE_NUMBER}
        name={labPublicPlaceNumber}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={LaboratoryPropertiesEnum.PUBLIC_PLACE_COMPLEMENT}
        name={labPublicPlaceComplement}
      >
        <Input />
      </Form.Item>
    </CreateModal>
  );
};

export default CreateLaboratoryModal;
