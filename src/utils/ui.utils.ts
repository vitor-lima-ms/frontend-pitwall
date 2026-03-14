/* Enum imports */
import { PluralPagesNamesEnum } from "@/enums/ui/plural-pages-names.enum";
import { RoutePathEnum } from "@/enums/ui/route-paths.enum";
/* UiUtils */
export default class UiUtils {
  static generatePageTitleFromRoute(
    pathname: RoutePathEnum,
  ): PluralPagesNamesEnum | string {
    switch (pathname) {
      case RoutePathEnum.CIRCUIT:
        return PluralPagesNamesEnum.CIRCUIT;
      case RoutePathEnum.CONSTRUCTOR:
        return PluralPagesNamesEnum.CONSTRUCTOR;
      case RoutePathEnum.DRIVER:
        return PluralPagesNamesEnum.DRIVER;
      case RoutePathEnum.HOME:
        return "Home";
    }
  }
}
