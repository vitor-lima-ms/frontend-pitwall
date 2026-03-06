/* API imports */
import updateTposmp from "@/app/(main)/sampling-points/_api/tposmp/update-tposmp";
import getToxicParameters from "@/app/(main)/toxic-parameters/_api/tp/get-tps";
import getUnits from "@/app/(main)/units/_api/get-uns";
/* Component imports */
import UpdateModal from "@/app/_components/modals/update-modal.component";
/* Context imports */
import SpContext from "@/app/(main)/sampling-points/_context/sp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { TposmpPropertiesEnum } from "@/enums/api/toxic-parameters-of-samples/tposmp-properties.enum";
/* Other libraries imports */
import { App, Form, Input, Select } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext, useState } from "react";
/* Request imports */
import UpdateTposmp from "@/requests/toxic-parameters-of-samples/update-tposmp.request";
/* Response imports */
import FindToxicParameterData from "@/responses/toxic-parameter/find-tp-data.response";
import FindUnitData from "@/responses/units/find-un-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UpdateTposmpModal */
const UpdateTposmpModal: React.FC = () => {
  /**
   * useSession.
   */
  const { data } = useSession();
  /**
   *
   */

  /**
   * Context.
   */
  const context = useContext(SpContext);
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
  const tposmpTpId: keyof UpdateTposmp = "tposmpTpId";

  const tposmpOriginalValue: keyof UpdateTposmp = "tposmpOriginalValue";

  const tposmpSmpId: keyof UpdateTposmp = "tposmpSmpId";

  const tposmpUnId: keyof UpdateTposmp = "tposmpUnId";
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
  const [tps, setTps] = useState<FindToxicParameterData[]>([]);

  const [uns, setUns] = useState<FindUnitData[]>([]);
  /**
   *
   */

  /**
   * Buscando os Parâmetros tóxicos.
   */
  const getTpsLoading = useRequest(
    () => getToxicParameters(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          const tps: GenericSuccessResponse<FindToxicParameterData> =
            data as GenericSuccessResponse<FindToxicParameterData>;

          setTps(tps.data);
        }
      },
    },
  ).loading;
  /**
   *
   */

  /**
   * Buscando as Unidades.
   */
  const getUnsLoading = useRequest(() => getUnits(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        const uns: GenericSuccessResponse<FindUnitData> =
          data as GenericSuccessResponse<FindUnitData>;

        setUns(uns.data);
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
    () =>
      updateTposmp(
        form.getFieldsValue(),
        context!.tposmp!.tposmpId,
        data?.accessToken,
      ),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setUpdateButtonFromModalIsClicked(true);

          context!.setShowTposmpUpdateModal(false);

          message.success(successResponse.data[0]);
        } else {
          context!.setErrorResponse(data as GenericErrorResponse);
        }
      },
    },
  );
  /**
   *
   */

  return (
    <UpdateModal
      form={form}
      instanceName="Parâmetro tóxico da Amostra"
      loading={loading}
      onFinish={run}
      setShowUpdateModal={context!.setShowTposmpUpdateModal}
      showUpdateModal={context!.showTposmpUpdateModal}
    >
      <Form.Item initialValue={context!.smpId?.smpId} name={tposmpSmpId} hidden>
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={context!.tposmp?.tposmpTp.tpId}
        label={TposmpPropertiesEnum.TOXIC_PARAMETER}
        name={tposmpTpId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getTpsLoading}
          options={tps.map((value) => {
            return { label: value.tpName, value: value.tpId };
          })}
          showSearch={{ optionFilterProp: "label" }}
        />
      </Form.Item>

      <Form.Item
        initialValue={context!.tposmp?.tposmpOriginalValue}
        label={TposmpPropertiesEnum.ORIGINAL_VALUE}
        name={tposmpOriginalValue}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        initialValue={context!.tposmp?.tposmpUn.unId}
        label={TposmpPropertiesEnum.UNIT}
        name={tposmpUnId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getUnsLoading}
          options={uns.map((value) => {
            return {
              label: value.unName,
              value: value.unId,
            };
          })}
        />
      </Form.Item>
    </UpdateModal>
  );
};

export default UpdateTposmpModal;
