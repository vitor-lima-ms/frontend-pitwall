"use client";
/* Enum imports */
import { SingularPagesNamesEnum } from "@/enums/ui/singular-pages-names.enum";
/* Other libraries imports */
import { useTitle } from "ahooks";
/* Home */
const Home: React.FC = () => {
  /**
   * Definindo o título.
   */
  useTitle(SingularPagesNamesEnum.HOME);
  /**
   *
   */

  return <>Hello, World!</>;
};

export default Home;
