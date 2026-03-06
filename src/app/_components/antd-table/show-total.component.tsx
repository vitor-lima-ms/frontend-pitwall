/* Other libraries imports */
import { Col, Flex, Typography } from "antd";
/* ShowTotal */
const ShowTotal: React.FC<{
  fontSize: number;
  range: [number, number];
  total: number;
}> = (props) => {
  /**
   * Typography.
   */
  const { Text } = Typography;
  /**
   *
   */

  return (
    <Col>
      <Flex>
        <Text disabled style={{ fontSize: props.fontSize }}>
          {props.range[0]}-{props.range[1]} de {props.total}
        </Text>
      </Flex>
    </Col>
  );
};

export default ShowTotal;
