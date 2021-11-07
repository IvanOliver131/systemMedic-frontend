import { Medicine } from "./medicine";

export class Pacient {
  id: number;
  name: string;
  age: number;
  bairro: string;
  cpf: string;
  cartaoSUS_RG: string;
  lstMedicine: Array<Medicine> = new Array<Medicine>();
}
