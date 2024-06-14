import { StateType } from '../enumerations/stateType';
import { getTime } from '../utilities/general';

export class Message {
  public id:number=0;
  public ok: boolean=false;
  public message: string="";
  public state: StateType=StateType.error;
  public time: string="";
  
  constructor(stateType:StateType, message: string) {
    this.message = message;
    this.time = getTime();
    this.state = stateType;

    switch(stateType){
      case StateType.success:
        this.ok=true;
        break;
      case StateType.info:
        this.ok=true;
        break;
      case StateType.error:
        this.ok=false;
        break;
      default:
    }
  }
}
