/* Component imports */
import CancelButton from "../buttons/cancel-button.component";
import ClearButton from "../buttons/clear-button.component";
import SearchButton from "../buttons/search-button.component";
/* Other libraries imports */
import { Col, DatePicker, Divider, Row, theme } from "antd";
import dayjs from "dayjs";
/* React imports */
import { Dispatch, useState, SetStateAction } from "react";
/* DateColumnFilter */
const DateColumnFilter: React.FC<{
  close: () => void;
  endDate: string | undefined;
  handleSearch: () => void;
  selectedKeys: React.Key[];
  setEndDate: Dispatch<SetStateAction<string | undefined>>;
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  setStartDate: Dispatch<SetStateAction<string | undefined>>;
  startDate: string | undefined;
}> = (props) => {
  /**
   * Estilos.
   */
  const {
    token: { paddingSM },
  } = theme.useToken();
  /**
   *
   */

  /**
   * RangePicker.
   */
  const { RangePicker } = DatePicker;
  /**
   *
   */

  /**
   * Variáveis de estado.
   */
  const [clearButtonWasClicked, setClearButtonWasClicked] = useState(true);
  /**
   *
   */

  return (
    <Col style={{ padding: paddingSM, width: 300 }}>
      <Row>
        <RangePicker
          format={"DD/MM/YYYY"}
          onChange={(_, datesString) => {
            setClearButtonWasClicked(false);

            props.setStartDate(datesString[0]);

            props.setEndDate(datesString[1]);

            props.setSelectedKeys(datesString);
          }}
          value={
            clearButtonWasClicked
              ? [undefined, undefined]
              : [
                  dayjs(props.startDate?.split("/").reverse().join("-")),
                  dayjs(props.endDate?.split("/").reverse().join("-")),
                ]
          }
        />
      </Row>

      <Divider />

      <Row justify="space-around">
        <SearchButton onClick={props.handleSearch} />

        <ClearButton
          onClick={() => {
            setClearButtonWasClicked(true);

            props.setSelectedKeys([]);

            props.handleSearch();
          }}
        />

        <CancelButton onClick={() => props.close()} />
      </Row>
    </Col>
  );
};

export default DateColumnFilter;
