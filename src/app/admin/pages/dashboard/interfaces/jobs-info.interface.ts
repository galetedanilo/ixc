import { JobsInterface } from "./jobs.interface";

export interface JobsInfoInterface {
  status: boolean | undefined;
  lastRun: Date | undefined;
  dataTable: JobsInterface[];
}
