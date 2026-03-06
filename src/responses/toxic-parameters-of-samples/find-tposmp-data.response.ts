/* FindTposmpData */
export default interface FindTposmpData {
  tposmpCompiledValue: number | null;
  tposmpId: string;
  tposmpOriginalValue: string;
  tposmpSmpId: string;
  tposmpTp: {
    tpId: string;
    tpName: string;
  };
  tposmpUn: {
    unId: string;
    unName: string;
  };
}
