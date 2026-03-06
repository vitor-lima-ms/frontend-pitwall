/* GenericSuccessResponse */
export default interface GenericSuccessResponse<Data> {
  count: number;
  data: Data[];
  success: boolean;
}
