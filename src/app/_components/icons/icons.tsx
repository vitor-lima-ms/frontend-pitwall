/* Antd imports */
import { createFromIconfontCN } from "@ant-design/icons";
/* Enum imports */
import { IconFontEnum } from "@/enums/ui/iconfont.enum";
/* Icons */
const IconFont = createFromIconfontCN({
  scriptUrl: IconFontEnum.URL,
});

const Icons = {
  cancel: <IconFont type="icon-handle-x-filled" />,
  clear: <IconFont type="icon-clear-format-filled" />,
  close: <IconFont type="icon-close" />,
  collapseSidebar: <IconFont type="icon-left-one-filled" />,
  dark: <IconFont type="icon-moon-filled" />,
  delete: <IconFont type="icon-delete-filled" />,
  expandSidebar: <IconFont type="icon-right-one-filled" />,
  light: <IconFont type="icon-sun-filled" />,
  logout: <IconFont type="icon-logout" />,
  ok: <IconFont type="icon-check-one-filled" />,
  search: <IconFont type="icon-search-filled" />,
  user: <IconFont type="icon-user-filled" />,
};

export default Icons;
