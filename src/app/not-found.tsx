"use client";
/* Enum imports */
import { LogosPathsEnum } from "@/enums/ui/logos-paths.enum";
/* Font imports */
import stolzl from "./_font/stolzl";
/* Next.js imports */
import { useRouter } from "next/navigation";
/* Other libraries imports */
import { useFavicon, useTitle } from "ahooks";
import { Button, Result } from "antd";
/* NotFound */
const NotFound: React.FC = () => {
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
  useTitle("Não encontrado!");
  /**
   *
   */

  /**
   * Router.
   */
  const router = useRouter();
  /**
   *
   */

  return (
    <Result
      extra={
        <Button
          onClick={() => router.push("/")}
          styles={{
            content: {
              fontFamily: stolzl.style.fontFamily,
            },
          }}
          type="link"
        >
          Ir para a página inicial
        </Button>
      }
      status="404"
      styles={{ root: { fontFamily: stolzl.style.fontFamily } }}
      subTitle="Desculpe, a página que você visitou não existe."
      title="404"
    />
  );
};

export default NotFound;
