"use client";
/* Enum imports */
import { LogosPathsEnum } from "@/enums/ui/logos-paths.enum";
/* Font imports */
import stolzl from "./_font/stolzl";
/* Other libraries imports */
import { useFavicon, useTitle } from "ahooks";
import { Result } from "antd";
/* GlobalError */
const GlobalError: React.FC = () => {
  /**
   * Favicon.
   */
  useFavicon(LogosPathsEnum.LIGHT_LOGO);
  /**
   *
   */

  /**
   * Definindo o título da página.
   */
  useTitle("Error!");
  /**
   *
   */

  return (
    <Result
      status="500"
      styles={{ root: { fontFamily: stolzl.style.fontFamily } }}
      subTitle="Erro interno do servidor. Contate a equipe de desenvolvimento."
      title="500"
    />
  );
};

export default GlobalError;
