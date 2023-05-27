import {Period} from "@sprinter-common/features/time/period/period";
import {client_aspect_type} from "@sprinter-common/schema/activities/activities";

export abstract class ClientTimeSeriesBase
{
    abstract request(user_id: number, period: Period, client_aspect: client_aspect_type): Promise<any[]>;
}
