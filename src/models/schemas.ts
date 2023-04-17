// External dependencies

import { ObjectId } from "mongodb";

// Class Implementation

export class Human {
    constructor(
        public nameOfHuman: string, 
        public typeOfHuman: string, 
        public teamOfHuman: string, 
        public fteOfHuman: number, 
        public activityOfHuman: string, 
        public id?: ObjectId) {}
}

export class Activity {
    constructor(
        public activityName: string, 
        public activityDescription: string, 
        public activityCatagory: string, 
        public id?: ObjectId) {}
}

export class Catagory {
    constructor(
        public catagoryName: string, 
        public catagoryDescription: string, 
        public id?: ObjectId) {}
}
