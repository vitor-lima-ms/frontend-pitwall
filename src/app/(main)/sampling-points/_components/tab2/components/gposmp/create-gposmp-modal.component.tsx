/* API imports */
import createGposmp from "../../../../_api/gposmp/create-gposmp";
import getGenericParameters from "@/app/(main)/generic-parameters/_api/gp/get-gps";
import getUnits from "@/app/(main)/units/_api/get-uns";
/* Component imports  */
import CreateModal from "@/app/_components/modals/create-modal.component";
/* Context imports */
import SpContext from "../../../../_context/sp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { GposmpPropertiesEnum } from "@/enums/api/generic-parameters-of-samples/gposmp-properties.enum";
/* Icons imports */
import Icons from "@/app/_components/icons/icons";
/* Other libraries imports */
import { App, Button, Card, Flex, Form, Input, Select, theme } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext, useState } from "react";
/* Request imports */
import CreateGposmp from "@/requests/generic-parameters-of-samples/create-gposmp.request";
/* Response imports */
import FindGenericParameterData from "@/responses/generic-parameters/find-gp-data.response";
import FindUnitData from "@/responses/units/find-un-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* CreateGposmpModal */
const CreateGposmpModal: React.FC = () => {
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
   * Estilos.
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
  const gposmpGpId: keyof CreateGposmp["gposmpGps"][0] = "gposmpGpId";

  const gposmpGps: keyof CreateGposmp = "gposmpGps";

  const gposmpOriginalValue: keyof CreateGposmp["gposmpGps"][0] =
    "gposmpOriginalValue";

  const gposmpUnId: keyof CreateGposmp["gposmpGps"][0] = "gposmpUnId";

  const gposmpSmpId: keyof CreateGposmp = "gposmpSmpId";
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
  const [gps, setGps] = useState<FindGenericParameterData[]>([]);

  const [uns, setUns] = useState<FindUnitData[]>([]);
  /**
   *
   */

  /**
   * Buscando os Parâmetros genéricos.
   */
  const getGpsLoading = useRequest(
    () => getGenericParameters(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          const gps: GenericSuccessResponse<FindGenericParameterData> =
            data as GenericSuccessResponse<FindGenericParameterData>;

          setGps(gps.data);
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
    () => createGposmp(form.getFieldsValue(), data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setCreateButtonFromModalIsClicked(true);

          context!.setShowGposmpCreateModal(false);

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
      setShowCreateModal={context!.setShowGposmpCreateModal}
      showCreateModal={context!.showGposmpCreateModal}
      singularEntityName="Parâmetro genérico à Amostra"
    >
      <Form.Item initialValue={context!.smpId!.smpId} name={gposmpSmpId} hidden>
        <Input />
      </Form.Item>

      <Form.List name={gposmpGps}>
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
                title={`${GposmpPropertiesEnum.GENERIC_PARAMETER} ${
                  field.name + 1
                }`}
              >
                <Form.Item
                  label={GposmpPropertiesEnum.GENERIC_PARAMETER}
                  name={[field.name, gposmpGpId]}
                  rules={[
                    { message: FeedbackEnum.REQUIRED_FIELD, required: true },
                  ]}
                >
                  <Select
                    loading={getGpsLoading}
                    options={gps.map((value) => {
                      return { label: value.gpName, value: value.gpId };
                    })}
                    showSearch={{ optionFilterProp: "label" }}
                  />
                </Form.Item>

                <Form.Item
                  label={GposmpPropertiesEnum.ORIGINAL_VALUE}
                  name={[field.name, gposmpOriginalValue]}
                  rules={[
                    { message: FeedbackEnum.REQUIRED_FIELD, required: true },
                  ]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  label={GposmpPropertiesEnum.UNIT}
                  name={[field.name, gposmpUnId]}
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

export default CreateGposmpModal;
