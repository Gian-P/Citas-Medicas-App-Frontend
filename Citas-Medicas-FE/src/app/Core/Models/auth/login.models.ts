import { Base } from "../base.models";
import { rol } from "../rol/rol.model";

export interface login extends Base{
  email: string;
  password: string;
  rolSet?: rol;
  tokenJwt?: rol;
}
