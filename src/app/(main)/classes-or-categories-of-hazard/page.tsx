"use client";
/* API imports */
import getGcocohs from "./_api/get-gcocohs";
/* Component imports */
import GcocohsTable from "./_components/gcocohs-table.component";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { PluralPagesNamesEnum } from "@/enums/ui/plural-pages-names.enum";
/* Other libraries imports */
import { App, Flex, Spin } from "antd";
import { useRequest, useTitle } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useEffect, useState } from "react";
/* Response imports */
import FindGcocohData from "@/responses/generic-classes-or-categories-of-hazard/find-gcocoh-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* Cocoh */
const Cocoh: React.FC = () => {
  /**
   * Definindo o título da página.
   */
  useTitle(PluralPagesNamesEnum.CLASS_OR_CATEGORY_OF_HAZARD);
  /**
   *
   */

  /**
   * useSession.
   */
  const { data } = useSession();
  /**
   *
   */

  /**
   * Variáveis de estado.
   */
  const [errorResponse, setErrorResponse] = useState<GenericErrorResponse>();

  const [getSuccessResponse, setGetSuccessResponse] =
    useState<GenericSuccessResponse<FindGcocohData>>();
  /**
   *
   */

  /**
   * Antd App Wraper.
   */
  const { message, notification } = App.useApp();
  /**
   *
   */

  /**
   * Buscando os dados.
   */
  const { loading } = useRequest(() => getGcocohs(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        setGetSuccessResponse(data as GenericSuccessResponse<FindGcocohData>);

        message.success(FeedbackEnum.SUCCESS_ON_FETCH);
      } else {
        setErrorResponse(data as GenericErrorResponse);
      }
    },
    ready: !!data?.accessToken,
    refreshDeps: [data?.accessToken],
  });
  /**
   *
   */

  /**
   * Efeito para exibir os erros.
   */
  useEffect(() => {
    if (errorResponse) {
      notification.error({ showProgress: true, title: errorResponse.details });
    }
  }, [errorResponse, notification]);
  /**
   *
   */

  if (getSuccessResponse) {
    return (
      <Flex vertical>
        <Spin spinning={loading}>
          <GcocohsTable data={getSuccessResponse} />
        </Spin>
      </Flex>
    );
  }
};

export default Cocoh;
