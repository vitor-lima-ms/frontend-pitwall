/* Component imports */
import CancelButton from "../buttons/cancel-button.component";
import ClearButton from "../buttons/clear-button.component";
import SearchButton from "../buttons/search-button.component";
/* Other libraries imports */
import { Col, Divider, Input, Row, theme } from "antd";
/* ColumnFilter */
const ColumnFilter: React.FC<{
  close: () => void;
  handleSearch: () => void;
  selectedKeys: React.Key[];
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
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

  return (
    <Col style={{ padding: paddingSM, width: 150 }}>
      <Row>
        <Input
          onChange={(event) => props.setSelectedKeys([event.target.value])}
          onPressEnter={props.handleSearch}
          placeholder="Digite aqui..."
          value={props.selectedKeys[0]}
        />
      </Row>

      <Divider />

      <Row justify="space-around">
        <SearchButton onClick={props.handleSearch} />

        <ClearButton
          onClick={() => {
            props.setSelectedKeys([]);

            props.handleSearch();
          }}
        />

        <CancelButton onClick={() => props.close()} />
      </Row>
    </Col>
  );
};

export default ColumnFilter;
