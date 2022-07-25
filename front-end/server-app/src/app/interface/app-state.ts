import { DataState } from "../enum/data-state.enum";

export interface AppState<T> {
    // determine state of the application, can be in loading, loaded, or error state
    dataState: DataState;
    // make appData and error also optional, can be either one or the other 
    appData?: T; 
    error?: string; 
}