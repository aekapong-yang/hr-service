import { ClsServiceManager } from "nestjs-cls";
import { ApiStore } from "src/shared/types/types";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { LeaveRequest } from "../leave-request.entity";
import { Audit } from "./audit";

@EventSubscriber()
export class LeaveRequestSubscriber
  implements EntitySubscriberInterface<Audit>
{
  listenTo() {
    return Audit;
  }

  beforeInsert(event: InsertEvent<Audit>) {
    const userId = ClsServiceManager.getClsService<ApiStore>().get('userId');
    if (event.entity) {
      event.entity.createdBy = userId;
      event.entity.createdAt = new Date();

      event.entity.updatedBy = userId;
      event.entity.updatedAt = new Date();
    }
  }

  beforeUpdate(event: UpdateEvent<LeaveRequest>) {
    const userId = ClsServiceManager.getClsService<ApiStore>().get('userId');
    if (event.entity) {
      event.entity.updatedBy = userId;
      event.entity.updatedAt = new Date();
    }
  }
}
