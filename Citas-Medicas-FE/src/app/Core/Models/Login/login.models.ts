import { Base } from "../base.models";

export interface login extends Base{
  email: string;
  password: string;
}
