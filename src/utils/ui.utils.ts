/* Enum imports */
import { PluralPagesNamesEnum } from "@/enums/ui/plural-pages-names.enum";
import { RoutePathEnum } from "@/enums/ui/route-paths.enum";
/* UiUtils */
export default class UiUtils {
  static generatePageTitleFromRoute(
    pathname: RoutePathEnum,
  ): PluralPagesNamesEnum | string {
    switch (pathname) {
      case RoutePathEnum.CLASS_OR_CATEGORY_OF_HAZARD:
        return PluralPagesNamesEnum.CLASS_OR_CATEGORY_OF_HAZARD;
      case RoutePathEnum.ENVIRONMENTAL_MATRIX:
        return PluralPagesNamesEnum.ENVIRONMENTAL_MATRIX;
      case RoutePathEnum.EPA:
        return PluralPagesNamesEnum.EPA;
      case RoutePathEnum.GENERIC_PARAMETER:
        return PluralPagesNamesEnum.GENERIC_PARAMETER;
      case RoutePathEnum.IMPORT:
        return PluralPagesNamesEnum.IMPORT;
      case RoutePathEnum.LABORATORY:
        return PluralPagesNamesEnum.LABORATORY;
      case RoutePathEnum.MAP:
        return PluralPagesNamesEnum.MAP;
      case RoutePathEnum.PUBLISHER:
        return PluralPagesNamesEnum.PUBLISHER;
      case RoutePathEnum.REGULATION:
        return PluralPagesNamesEnum.REGULATION;
      case RoutePathEnum.SAMPLING_POINT:
        return PluralPagesNamesEnum.SAMPLING_POINT;
      case RoutePathEnum.TOXIC_PARAMETER:
        return PluralPagesNamesEnum.TOXIC_PARAMETER;
      case RoutePathEnum.UNIT:
        return PluralPagesNamesEnum.UNIT;
      case RoutePathEnum.HOME:
        return "Home";
    }
  }
}
