import { Context } from "telegraf";

export interface CommandMapElement {
  command: string,
  action: (ctx: Context) => void
}