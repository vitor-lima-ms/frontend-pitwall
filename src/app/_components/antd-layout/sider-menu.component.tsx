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
      label: PluralPagesNamesEnum.DRIVER,
      onClick: (info) => {
        props.router.push(RoutePathEnum.DRIVER);

        setMenuItemKey(info.key);
      },
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
