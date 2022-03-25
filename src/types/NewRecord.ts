import { Record } from "./Record";

export type NewRecord = Omit<Record, "id">;
