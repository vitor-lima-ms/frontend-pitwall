/* Enum imports */
import { PublicPlaceTypesEnum } from "@/enums/api/laboratories/public-place-types.enum";
import { UfsEnum } from "@/enums/api/laboratories/ufs.enum";
/* FindLaboratoryData */
export default interface FindLaboratoryData {
  labCep: string;
  labCnpj: string;
  labCompanyName: string;
  labEmail: string;
  labId: string;
  labLocalityName: string;
  labMainContact: string;
  labPhone: string;
  labPublicPlaceComplement: null | string;
  labPublicPlaceName: string;
  labPublicPlaceNumber: string;
  labPublicPlaceType: PublicPlaceTypesEnum;
  labUf: UfsEnum;
};
