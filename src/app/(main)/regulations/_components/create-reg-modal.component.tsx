/* API imports */
import createRegulation from "../_api/create-reg";
import getPublishers from "../../publishers/_api/get-pubs";
/* Component imports */
import CreateModal from "@/app/_components/modals/create-modal.component";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { RegulationPropertiesEnum } from "@/enums/api/regulations/reg-properties.enum";
import { SingularPagesNamesEnum } from "@/enums/ui/singular-pages-names.enum";
/* Other libraries imports */
import { App, DatePicker, Form, Input, Select } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction, useState } from "react";
/* Request imports */
import CreateRegulation from "@/requests/regulations/create-reg.request";
/* Response imports */
import FindPublisherData from "@/responses/publishers/find-pub-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* CreateRegulationModal */
const CreateRegulationModal: React.FC<{
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
  const regIdentifier: keyof CreateRegulation = "regIdentifier";

  const regPublicationDate: keyof CreateRegulation = "regPublicationDate";

  const regPubId: keyof CreateRegulation = "regPubId";
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
   * Variáveis de estado.
   */
  const [pubs, setPubs] = useState<FindPublisherData[]>([]);
  /**
   *
   */

  /**
   * Buscando os Publicadores.
   */
  const getPubsLoading = useRequest(() => getPublishers(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        const pubs: GenericSuccessResponse<FindPublisherData> =
          data as GenericSuccessResponse<FindPublisherData>;

        setPubs(pubs.data);
      }
    },
  }).loading;
  /**
   *
   */

  /**
   * Enviando os dados.
   */
  const { loading, run } = useRequest(
    () => createRegulation(form.getFieldsValue(), data?.accessToken),
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
      singularEntityName={SingularPagesNamesEnum.REGULATION}
    >
      <Form.Item
        label={RegulationPropertiesEnum.PUBLICATION_DATE}
        name={regPublicationDate}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <DatePicker
          format={{ format: "DD/MM/YYYY" }}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label={RegulationPropertiesEnum.IDENTIFIER}
        name={regIdentifier}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={RegulationPropertiesEnum.PUBLISHER}
        name={regPubId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getPubsLoading}
          options={pubs.map((pub) => {
            return { label: pub.pubAcronym, value: pub.pubId };
          })}
        />
      </Form.Item>
    </CreateModal>
  );
};

export default CreateRegulationModal;
