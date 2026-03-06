/* API imports */
import createTposmp from "../../../../_api/tposmp/create-tposmp";
import getToxicParameters from "@/app/(main)/toxic-parameters/_api/tp/get-tps";
import getUnits from "@/app/(main)/units/_api/get-uns";
/* Component imports  */
import CreateModal from "@/app/_components/modals/create-modal.component";
/* Context imports */
import SpContext from "../../../../_context/sp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { TposmpPropertiesEnum } from "@/enums/api/toxic-parameters-of-samples/tposmp-properties.enum";
/* Icons imports */
import Icons from "@/app/_components/icons/icons";
/* Other libraries imports */
import { App, Button, Card, Flex, Form, Input, Select, theme } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext, useState } from "react";
/* Request imports */
import CreateTposmp from "@/requests/toxic-parameters-of-samples/create-tposmp.request";
/* Response imports */
import FindToxicParameterData from "@/responses/toxic-parameter/find-tp-data.response";
import FindUnitData from "@/responses/units/find-un-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* CreateTposmpModal */
const CreateTposmpModal: React.FC = () => {
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
   *
   */

  /**
   * Estilos
   */
  const {
    token: { marginXS },
  } = theme.useToken();
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
  const tposmpTpId: keyof CreateTposmp["tposmpTps"][0] = "tposmpTpId";

  const tposmpTps: keyof CreateTposmp = "tposmpTps";

  const tposmpOriginalValue: keyof CreateTposmp["tposmpTps"][0] =
    "tposmpOriginalValue";

  const tposmpUnId: keyof CreateTposmp["tposmpTps"][0] = "tposmpUnId";

  const tposmpSmpId: keyof CreateTposmp = "tposmpSmpId";
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
    () => createTposmp(form.getFieldsValue(), data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setCreateButtonFromModalIsClicked(true);

          context!.setShowTposmpCreateModal(false);

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
    <CreateModal
      form={form}
      loading={loading}
      onFinish={run}
      setShowCreateModal={context!.setShowTposmpCreateModal}
      showCreateModal={context!.showTposmpCreateModal}
      singularEntityName="Parâmetro tóxico à Amostra"
    >
      <Form.Item initialValue={context!.smpId?.smpId} name={tposmpSmpId} hidden>
        <Input />
      </Form.Item>

      <Form.List name={tposmpTps}>
        {(fields, { add, remove }) => (
          <Flex vertical>
            {fields.map((field) => (
              <Card
                extra={
                  <Button
                    color="danger"
                    icon={Icons.close}
                    onClick={() => remove(field.name)}
                    variant="link"
                  />
                }
                key={field.key}
                style={{ marginBottom: marginXS }}
                title={`${TposmpPropertiesEnum.TOXIC_PARAMETER} ${
                  field.name + 1
                }`}
              >
                <Form.Item
                  label={TposmpPropertiesEnum.TOXIC_PARAMETER}
                  name={[field.name, tposmpTpId]}
                  rules={[
                    { message: FeedbackEnum.REQUIRED_FIELD, required: true },
                  ]}
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
                  label={TposmpPropertiesEnum.ORIGINAL_VALUE}
                  name={[field.name, tposmpOriginalValue]}
                  rules={[
                    { message: FeedbackEnum.REQUIRED_FIELD, required: true },
                  ]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  label={TposmpPropertiesEnum.UNIT}
                  name={[field.name, tposmpUnId]}
                  rules={[
                    { message: FeedbackEnum.REQUIRED_FIELD, required: true },
                  ]}
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
              </Card>
            ))}

            <Button color="blue" onClick={() => add()} variant="dashed">
              + Adicionar
            </Button>
          </Flex>
        )}
      </Form.List>
    </CreateModal>
  );
};

export default CreateTposmpModal;
