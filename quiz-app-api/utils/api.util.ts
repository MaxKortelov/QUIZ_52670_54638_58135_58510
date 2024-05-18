import {ResponseMessage} from "../types/api.util";

export function responseMessage(message: string): ResponseMessage {
  return {
    message
  }
}