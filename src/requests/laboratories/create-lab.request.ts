/* Enum imports */
import { PublicPlaceTypesEnum } from "@/enums/api/laboratories/public-place-types.enum";
import { UfsEnum } from "@/enums/api/laboratories/ufs.enum";
/* CreateLaboratory */
export default interface CreateLaboratory {
  labCep: string;
  labCnpj: string;
  labCompanyName: string;
  labEmail: string;
  labLocalityName: string;
  labMainContact: string;
  labPhone: string;
  labPublicPlaceComplement: null | string;
  labPublicPlaceName: string;
  labPublicPlaceNumber: string;
  labPublicPlaceType: PublicPlaceTypesEnum;
  labUf: UfsEnum;
}
