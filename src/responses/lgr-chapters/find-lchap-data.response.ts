/* FindLChapterData */
export default interface FindLChapterData {
  lchapChapter: string;
  lchapDescription: string;
  lchapId: string;
  lchapLCodes: {
    lcodeComplementaries: {
      lcodecompComplementaryLgrCode: {
        lcodeDescription: string;
        lcodeHazardous: boolean;
        lcodeId: string;
        lcodeInputType: string;
        lcodeSubchapter: string;
        lcodeSubchapterDescription: string;
        lcodeWasteType: string;
      };
      lcodecompId: string;
    }[];
    lcodeDescription: string;
    lcodeHazardous: boolean;
    lcodeId: string;
    lcodeInputType: string;
    lcodeSubchapter: string;
    lcodeSubchapterDescription: string;
    lcodeWasteType: string;
  }[];
}
