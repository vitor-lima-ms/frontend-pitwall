/* Component imports */
import ChangeThemeButton from "../buttons/change-theme-button.component";
import ControlSidebarButton from "../buttons/control-sidebar-button.component";
import LogoutButton from "../buttons/logout-button.component";
/* Enum imports */
import { ColorThemeEnum } from "@/enums/ui/color-theme.enum";
/* Other libraries imports */
import { Col, Flex, Row } from "antd";
import { SetState } from "ahooks/lib/createUseStorageState";
/* MainHeaderContent */
const MinHeaderContent: React.FC<{
  collapsed: boolean;
  colorTheme: ColorThemeEnum | undefined;
  margin: number;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setColorTheme: (value: SetState<ColorThemeEnum | undefined>) => void;
}> = (props) => {
  return (
    <Row>
      <Col span={12} style={{ alignContent: "center" }}>
        <Flex>
          <ControlSidebarButton
            collapsed={props.collapsed}
            colorTheme={props.colorTheme}
            setCollapsed={props.setCollapsed}
          />
        </Flex>
      </Col>
      <Col span={12}>
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

export default MinHeaderContent;
