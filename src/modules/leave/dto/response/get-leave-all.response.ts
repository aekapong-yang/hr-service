export class GetLeaveAllResponse {
  leaveId: string;
  userId: string;
  username: string;
  leaveType: ValueLabel;
  startDate: Date;
  endDate: Date;
  reason: string;
}

type ValueLabel = {
  value:string,
  label:string
}
