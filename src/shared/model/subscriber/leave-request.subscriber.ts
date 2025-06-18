import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { LeaveRequest } from "../leave-request.entity";

@EventSubscriber()
export class LeaveRequestSubscriber
  implements EntitySubscriberInterface<LeaveRequest>
{
  listenTo() {
    return LeaveRequest;
  }

  beforeInsert(event: InsertEvent<LeaveRequest>) {
    const userId = "sss";
    const username = "ss";
    if (event.entity) {
      event.entity.userId = userId;
      event.entity.username = username;

      event.entity.createdBy = userId;
      event.entity.createdAt = new Date();

      event.entity.updatedBy = userId;
      event.entity.updatedAt = new Date();
    }
  }

  beforeUpdate(event: UpdateEvent<LeaveRequest>) {
    const userId = "ss";
    if (event.entity) {
      event.entity.updatedBy = userId;
      event.entity.updatedAt = new Date();
    }
  }
}
