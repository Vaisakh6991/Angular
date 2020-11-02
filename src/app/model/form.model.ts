export interface Member {
  mname: string;
  mobile: number;
  occupation: string;
}
export interface UserData {
  name: string;
  address: string;
  age: number;
  members?: Member[];
}
