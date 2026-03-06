/* API imports */
import classifySample from "@/app/(main)/sampling-points/_api/smp/classify-smp";
import getLChaps from "@/app/(main)/sampling-points/_api/lchap/get-lchaps";
import getRegulations from "@/app/(main)/regulations/_api/get-regs";
/* Context imports */
import SpContext from "@/app/(main)/sampling-points/_context/sp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
/* Icons imports */
import Icons from "@/app/_components/icons/icons";
/* Other libraries imports */
import { App, Checkbox, Form, Modal, Select, Spin } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext, useState } from "react";
/* Request imports */
import ClassifySample from "@/requests/samples/classify-sample-request";
/* Response imports */
import FindLChapterData from "@/responses/lgr-chapters/find-lchap-data.response";
import FindRegulationData from "@/responses/regulations/find-reg-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* ClassifySampleModal */
const ClassifySampleModal: React.FC = () => {
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
  const smpCorrosive: keyof ClassifySample = "smpCorrosive";

  const smpFlammable: keyof ClassifySample = "smpFlammable";

  const smpLCodeId: keyof ClassifySample = "smpLCodeId";

  const smpPathogenic: keyof ClassifySample = "smpPathogenic";

  const smpReactive: keyof ClassifySample = "smpReactive";

  const smpRegulationForPops: keyof ClassifySample = "smpRegulationForPops";
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
  const [corrosiveCheck, setCorrosiveCheck] = useState(false);

  const [flammableCheck, setFlammableCheck] = useState(false);

  const [lcodes, setLCodes] = useState<
    (FindLChapterData["lchapLCodes"][0] & { lchapChapter: string })[]
  >([]);

  const [pathogenicCheck, setPathogenicCheck] = useState(false);

  const [reactiveCheck, setReactiveCheck] = useState(false);

  const [regs, setRegs] = useState<FindRegulationData[]>([]);
  /**
   *
   */

  /**
   * Buscando os Capítulos da LGR.
   */
  const getLChapsLoading = useRequest(() => getLChaps(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        const lchaps: GenericSuccessResponse<FindLChapterData> =
          data as GenericSuccessResponse<FindLChapterData>;

        const lcodes: (FindLChapterData["lchapLCodes"][0] & {
          lchapChapter: string;
        })[] = [];

        lchaps.data.forEach((value) => {
          value.lchapLCodes.forEach((value_) => {
            lcodes.push({
              lchapChapter: value.lchapChapter,
              lcodeComplementaries: value_.lcodeComplementaries,
              lcodeDescription: value_.lcodeDescription,
              lcodeHazardous: value_.lcodeHazardous,
              lcodeId: value_.lcodeId,
              lcodeInputType: value_.lcodeInputType,
              lcodeSubchapter: value_.lcodeSubchapter,
              lcodeSubchapterDescription: value_.lcodeSubchapterDescription,
              lcodeWasteType: value_.lcodeWasteType,
            });
          });
        });

        const lcodesWithout98And99 = lcodes.filter(
          (value) =>
            !value.lcodeWasteType.includes("98") &&
            !value.lcodeWasteType.includes("99"),
        );

        setLCodes(lcodesWithout98And99);
      }
    },
  }).loading;
  /**
   *
   */

  /**
   * Buscando as Normas.
   */
  const getRegsLoading = useRequest(() => getRegulations(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        const regs: GenericSuccessResponse<FindRegulationData> =
          data as GenericSuccessResponse<FindRegulationData>;

        setRegs(regs.data);
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
      classifySample(
        form.getFieldsValue(),
        context!.smp!.smpId,
        data?.accessToken,
      ),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          context!.setClassifyButtonFromModalIsClicked(true);

          context!.setShowClassificationModal(false);

          message.success("Classificação realizada com sucesso.");
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
        <Form clearOnDestroy form={form} layout="horizontal" onFinish={run}>
          {node}
        </Form>
      )}
      okButtonProps={{
        color: "green",
        htmlType: "submit",
        variant: "link",
      }}
      okText={loading ? <Spin /> : Icons.ok}
      onCancel={() => context!.setShowClassificationModal(false)}
      open={context!.showClassificationModal}
      title="Algumas informações adicionais..."
    >
      <Form.Item
        initialValue={context!.smp?.smpLCode && context!.smp?.smpLCode.lcodeId}
        label="Enquadramento na LGR"
        name={smpLCodeId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getLChapsLoading}
          options={lcodes.map((lcode) => {
            return {
              label: `${lcode.lchapChapter} ${lcode.lcodeSubchapter} ${lcode.lcodeWasteType} - ${lcode.lcodeDescription}`,
              value: lcode.lcodeId,
            };
          })}
          showSearch={{ optionFilterProp: "label" }}
        />
      </Form.Item>

      <Form.Item
        initialValue={
          context!.smp?.smpCorrosive ? context!.smp?.smpCorrosive : false
        }
        name={smpCorrosive}
        valuePropName="checked"
      >
        <Checkbox
          checked={corrosiveCheck}
          onChange={(event) => setCorrosiveCheck(event.target.checked)}
        >
          Corrosivo
        </Checkbox>
      </Form.Item>

      <Form.Item
        initialValue={
          context!.smp?.smpFlammable ? context!.smp?.smpFlammable : false
        }
        name={smpFlammable}
        valuePropName="checked"
      >
        <Checkbox
          checked={flammableCheck}
          onChange={(event) => setFlammableCheck(event.target.checked)}
        >
          Inflamável
        </Checkbox>
      </Form.Item>

      <Form.Item
        initialValue={
          context!.smp?.smpPathogenic ? context!.smp?.smpPathogenic : false
        }
        name={smpPathogenic}
        valuePropName="checked"
      >
        <Checkbox
          checked={pathogenicCheck}
          onChange={(event) => setPathogenicCheck(event.target.checked)}
        >
          Patogênico
        </Checkbox>
      </Form.Item>

      <Form.Item
        initialValue={
          context!.smp?.smpReactive ? context!.smp?.smpReactive : false
        }
        name={smpReactive}
        valuePropName="checked"
      >
        <Checkbox
          checked={reactiveCheck}
          onChange={(event) => setReactiveCheck(event.target.checked)}
        >
          Reativo
        </Checkbox>
      </Form.Item>

      <Form.Item
        label="Norma para POPs"
        name={smpRegulationForPops}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getRegsLoading}
          options={regs.map((reg) => {
            return {
              label: `${reg.regPub.pubAcronym} ${reg.regIdentifier}/${new Date(reg.regPublicationDate).getFullYear()}`,
              value: reg.regId,
            };
          })}
        />
      </Form.Item>
    </Modal>
  );
};

export default ClassifySampleModal;
