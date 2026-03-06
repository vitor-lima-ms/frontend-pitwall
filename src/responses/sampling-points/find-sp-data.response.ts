/* Enum imports */
import { ChaptersEnum } from "@/enums/api/lgr-chapters/chapters.enum";
/* FindSamplingPointData */
export default interface FindSamplingPointData {
  spCoordX: number;
  spCoordY: number;
  spCoordZ: null | number;
  spDescription: null | string;
  spEm: {
    emId: string;
    emName: string;
  };
  spId: string;
  spName: string;
  spSamples: {
    smpClassificationDetails: {
      step1: {
        finalLgrCodes: {
          lcodeDescription: string;
          lcodeHazardous: boolean;
          lcodeId: string;
          lcodeInputType: "Espelho" | "Única";
          lcodeLChap: {
            lcodeLChapChapter: ChaptersEnum;
            lcodeLChapDescription: string;
          };
          lcodeSubchapter: string;
          lcodeSubchapterDescription: string;
          lcodeWasteType: string;
        }[];
      };
      step2: {
        popsBeyondLimits: {
          popLimit: {
            popMaxValue: null | number;
            popMinValue: null | number;
          };
          popLimitUnName: string;
          popName: string;
          popResult: number;
          popResultUnName: string;
        }[];
        step2Result: "hazardous" | "notHazardous";
      };
      step3: {
        corrosive: boolean;
        flammable: boolean;
        pathogenic: boolean;
        reactive: boolean;
        step3Result: "hazardous" | "notHazardous";
      };
      step4: {
        cocohsWithSummationBeyondLimits: {
          cocohClassifiesAsHazard: boolean;
          cocohGenericMaxValue: null | number;
          cocohGenericMinValue: null | number;
          cocohGenericValuesUnName: string;
          cocohHCode: string;
          cocohName: string;
          cocohSummation: number;
          cocohSummationUnName: string;
        }[];
        step4Result: "hazardous" | "notHazardous";
        tpsBeyondLimits: {
          tpCasNumber: null | string;
          tpEcCode: null | string;
          tpResult: number;
          tpResultUnName: string;
          tpCocsBeyondLimits: {
            tpScocohAbbreviation: string;
            tpScocohDescription: string;
            tpScocohGcocoh: {
              tpScocohGcocohClassifiesAsHazard: boolean;
              tpScocohGcocohName: string;
              tpScocohGcocohSummation: boolean;
            };
            tpScocohGenericMaxValue: null | number;
            tpScocohGenericMinValue: null | number;
            tpScocohHCode: string;
            tpMfactor: null | number;
            tpScocohUnName: string;
            tpSotpSpecificMaxValue: null | number;
            tpSotpSpecificMinValue: null | number;
            tpSotpUnName: null | string;
          }[];
        }[];
      };
      classificationResult: "hazardous" | "notHazardous";
    } | null;
    smpClassificationResult: null | "Não perigoso" | "Perigoso";
    smpCorrosive: boolean;
    smpDepth: null | number;
    smpDescription: string;
    smpFlammable: boolean;
    smpGposmps: {
      gposmpCompiledValue: number;
      gposmpGp: {
        gpId: string;
        gpName: string;
        gpQsfgps: {
          qsfgpEm: {
            emId: string;
            emName: string;
          };
          qsfgpEmParticularity: string;
          qsfgpId: string;
          qsfgpMaxValue: null | number;
          qsfgpMinValue: null | number;
          qsfgpReg: {
            regId: string;
            regIdentifier: string;
            regPublicationDate: string;
          };
          qsfgpUn: {
            unId: string;
            unName: string;
          };
        }[];
      };
      gposmpId: string;
      gposmpOriginalValue: string;
      gposmpUn: {
        unId: string;
        unName: string;
      };
    }[];
    smpId: string;
    smpLCode: {
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
      lcodeLChap: {
        lchapChapter: string;
        lchapDescription: string;
        lchapId: string;
      };
      lcodeSubchapter: string;
      lcodeSubchapterDescription: string;
      lcodeWasteType: string;
    } | null;
    smpPathogenic: boolean;
    smpReactive: boolean;
    smpReportDetails: {
      reportART: null | string;
      reportExpirationDate: string;
      reportPOPSweep: boolean;
      reportResponsible: string;
      reportResponsibleIdentifier: string;
      reportSampler17025: boolean;
      reportSamplerIdentifier: string;
      reportSamplerName: string;
      reportSampling10007: boolean;
      reportSamplingDescription: string;
      reportWasteOrigin: string;
    } | null;
    smpSamplingDate: null | string;
    smpTposmps: {
      tposmpCompiledValue: number;
      tposmpId: string;
      tposmpOriginalValue: string;
      tposmpTp: {
        tpCasNumber: string;
        tpEcCode: string;
        tpId: string;
        tpName: string;
        tpSotps: {
          sotpId: string;
          sotpMfactor: number;
          sotpScocoh: {
            scocohAbbreviation: string;
            scocohDescription: string;
            scocohGcocoh: {
              gcocohClassifiesAsHazard: boolean;
              gcocohId: string;
              gcocohName: string;
              gcocohSummation: boolean;
            };
            scocohGenericMaxValue: null | number;
            scocohGenericMinValue: null | number;
            scocohHCode: {
              hcodeCode: string;
              hcodeId: string;
            };
            scocohId: string;
            scocohUn: {
              unId: string;
              unName: string;
            };
          };
          sotpSpecificMaxValue: null | number;
          sotpSpecificMinValue: null | number;
          sotpUn: null;
        }[];
      };
      tposmpUn: {
        unId: string;
        unName: string;
      };
    }[];
  }[];
}
