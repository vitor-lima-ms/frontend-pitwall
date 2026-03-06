/* Component imports */
import ChangeThemeButton from "../buttons/change-theme-button.component";
import ControlSidebarButton from "../buttons/control-sidebar-button.component";
import LogoutButton from "../buttons/logout-button.component";
/* Enum imports */
import { ColorPaletteEnum } from "@/enums/ui/color-palette.enum";
import { ColorThemeEnum } from "@/enums/ui/color-theme.enum";
import { RoutePathEnum } from "@/enums/ui/route-paths.enum";
/* Other libraries imports */
import { Col, Flex, Row, Typography } from "antd";
import { SetState } from "ahooks/lib/createUseStorageState";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Util imports */
import UiUtils from "@/utils/ui.utils";
/* MainHeaderContent */
const MainHeaderContent: React.FC<{
  collapsed: boolean;
  colorTheme: ColorThemeEnum | undefined;
  margin: number;
  pathname: RoutePathEnum;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  setColorTheme: (value: SetState<ColorThemeEnum | undefined>) => void;
}> = (props) => {
  /**
   * Typography.
   */
  const { Paragraph, Title } = Typography;
  /**
   *
   */

  /**
   * Obtendo o título da página a partir do pathname.
   */
  const headerTitle = UiUtils.generatePageTitleFromRoute(props.pathname);
  /**
   *
   */

  return (
    <Row>
      <Col span={14} style={{ alignContent: "center" }}>
        <Flex align="center">
          <ControlSidebarButton
            collapsed={props.collapsed}
            colorTheme={props.colorTheme}
            setCollapsed={props.setCollapsed}
          />

          {props.collapsed && (
            <Title
              level={5}
              style={{
                color:
                  props.colorTheme === ColorThemeEnum.DARK
                    ? ColorPaletteEnum.PRIMARY_COLOR
                    : ColorPaletteEnum.SECONDARY_COLOR,
                margin: props.margin,
              }}
            >
              {headerTitle}
            </Title>
          )}
        </Flex>
      </Col>
      <Col span={10}>
        <Flex
          align="center"
          gap="large"
          justify="flex-end"
          style={{ margin: props.margin }}
        >
          <ChangeThemeButton
            colorTheme={props.colorTheme}
            setColorTheme={props.setColorTheme}
          />
        </Flex>
      </Col>
    </Row>
  );
};

export default MainHeaderContent;
