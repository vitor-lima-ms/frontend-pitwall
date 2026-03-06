/* Enum imports */
import { PaginationEnum } from "@/enums/ui/pagination.enum";
/* Other libraries imports */
import { TableProps } from "antd";
/* antdPaginationOptions */
const antdPaginationOptions: TableProps["pagination"] = {
  defaultCurrent: 1,
  hideOnSinglePage: true,
  pageSize: PaginationEnum.PAGE_SIZE,
  showSizeChanger: false,
  simple: true,
  size: "small",
};

export default antdPaginationOptions;
