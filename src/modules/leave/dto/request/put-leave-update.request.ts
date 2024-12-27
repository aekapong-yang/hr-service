import { PostLeaveAddRequest } from "./post-leave-add.request";

export class PutLeaveUpdateRequest extends PostLeaveAddRequest {
  leaveId: string;
}
