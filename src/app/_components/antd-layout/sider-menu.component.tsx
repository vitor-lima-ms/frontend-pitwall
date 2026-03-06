/* Enum imports */
import { ColorThemeEnum } from "@/enums/ui/color-theme.enum";
import { PluralPagesNamesEnum } from "@/enums/ui/plural-pages-names.enum";
import { RoutePathEnum } from "@/enums/ui/route-paths.enum";
/* Icons import */
import Icons from "../icons/icons";
/* Next.js imports */
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
/* Other libraries imports */
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { Menu } from "antd";
/* React imports */
import { useState } from "react";
/* SiderMenu */
const SiderMenu: React.FC<{
  collapsed: boolean;
  colorTheme: ColorThemeEnum | undefined;
  pathname: string;
  router: AppRouterInstance;
  screenNotOnMdSize: boolean | undefined;
  screenNotOnSmSize: boolean | undefined;
}> = (props) => {
  /**
   * Itens do menu.
   */
  const [menuItemKey, setMenuItemKey] = useState("");

  const menuItems: ItemType<MenuItemType>[] = [
    {
      icon: Icons.em,
      key: "1",
      label: PluralPagesNamesEnum.ENVIRONMENTAL_MATRIX,
      onClick: (info) => {
        props.router.push(RoutePathEnum.ENVIRONMENTAL_MATRIX);

        setMenuItemKey(info.key);
      },
    },
    {
      icon: Icons.cocoh,
      key: "2",
      label: PluralPagesNamesEnum.CLASS_OR_CATEGORY_OF_HAZARD,
      onClick: (info) => {
        props.router.push(RoutePathEnum.CLASS_OR_CATEGORY_OF_HAZARD);

        setMenuItemKey(info.key);
      },
    },
    {
      icon: Icons.publisher,
      key: "3",
      label: PluralPagesNamesEnum.PUBLISHER,
      onClick: (info) => {
        props.router.push(RoutePathEnum.PUBLISHER);

        setMenuItemKey(info.key);
      },
    },
    {
      icon: Icons.regulation,
      key: "4",
      label: PluralPagesNamesEnum.REGULATION,
      onClick: (info) => {
        props.router.push(RoutePathEnum.REGULATION);

        setMenuItemKey(info.key);
      },
    },
    {
      icon: Icons.unit,
      key: "5",
      label: PluralPagesNamesEnum.UNIT,
      onClick: (info) => {
        props.router.push(RoutePathEnum.UNIT);

        setMenuItemKey(info.key);
      },
    },
    {
      icon: Icons.laboratory,
      key: "6",
      label: PluralPagesNamesEnum.LABORATORY,
      onClick: (info) => {
        props.router.push(RoutePathEnum.LABORATORY);

        setMenuItemKey(info.key);
      },
    },
    {
      icon: Icons.genericParameter,
      key: "7",
      label: PluralPagesNamesEnum.GENERIC_PARAMETER,
      onClick: (info) => {
        props.router.push(RoutePathEnum.GENERIC_PARAMETER);

        setMenuItemKey(info.key);
      },
    },
    {
      icon: Icons.toxicParameter,
      key: "8",
      label: PluralPagesNamesEnum.TOXIC_PARAMETER,
      onClick: (info) => {
        props.router.push(RoutePathEnum.TOXIC_PARAMETER);

        setMenuItemKey(info.key);
      },
    },
    {
      icon: Icons.samplingPointsAndSamples,
      key: "9",
      label: PluralPagesNamesEnum.SAMPLING_POINT,
      onClick: (info) => {
        props.router.push(RoutePathEnum.SAMPLING_POINT);

        setMenuItemKey(info.key);
      },
    },
    {
      icon: Icons.map,
      key: "10",
      label: PluralPagesNamesEnum.MAP,
      onClick: (info) => {
        props.router.push(RoutePathEnum.MAP);

        setMenuItemKey(info.key);
      },
    },
    {
      icon: Icons.import,
      key: "11",
      label: PluralPagesNamesEnum.IMPORT,
      onClick: (info) => {
        props.router.push(RoutePathEnum.IMPORT);

        setMenuItemKey(info.key);
      },
    },
    {
      children: [
        {
          icon: Icons.calculator,
          key: "12.1",
          label: PluralPagesNamesEnum.EPA,
          onClick: (info) => {
            props.router.push(RoutePathEnum.EPA);

            setMenuItemKey(info.key);
          },
        },
      ],
      icon: Icons.utils,
      key: "12",
      label: PluralPagesNamesEnum.UTILS,
    },
  ];

  const selectedKeys = props.pathname === "/" ? ["0"] : [menuItemKey];
  /**
   *
   */

  return (
    <Menu
      disabled={
        !props.screenNotOnMdSize && !props.screenNotOnSmSize && props.collapsed
          ? true
          : false
      }
      items={menuItems}
      mode="inline"
      selectedKeys={selectedKeys}
      style={{ borderInlineEnd: 0 }}
      theme={props.colorTheme}
    />
  );
};

export default SiderMenu;
