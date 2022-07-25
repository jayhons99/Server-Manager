import { Server } from "./server";

export interface CustomResponse {
    timeStamp: Date;
    statusCode: number; 
    status: string; 
    reason: string; 
    message: string; 
    developerMessage: string;
    // make this optional to catch for instances when we're missing a value from either object 
    data: { servers?: Server[], server?: Server }
}