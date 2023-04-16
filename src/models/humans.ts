// External dependencies

import { ObjectId } from "mongodb";

// Class Implementation

export default class Human {
    constructor(
        public nameOfHuman: string, 
        public typeOfHuman: string, 
        public teamOfHuman: string, 
        public fteOfHuman: number, 
        public activityOfHuman: string, 
        public id?: ObjectId) {}
}
