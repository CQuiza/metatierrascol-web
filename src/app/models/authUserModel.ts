
export class AuthUserModel {
  constructor(
    public username: string,
    public expiry:Date, 
    public groups: string[],
    public token:string,
    public isLoggedIn=false) {}

  getGroupsAsString(): string{
    return this.groups.join(', ');
  }

  getToken(): string{
    if (this.token != ''){
      return 'Token ' + this.token;
    } else {
      return ''
    }
  }
}