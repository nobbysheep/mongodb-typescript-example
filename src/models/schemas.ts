// External dependencies

import { ObjectId } from "mongodb";

// Class Implementation

export class Human {
    constructor(
        public nameOfHuman: string,
        public typeOfHuman: string,
        public teamOfHuman: string,
        public fteOfHuman: number,
        public id?: ObjectId,
    ) {}
}

export class Activity {
    constructor(
        public activityName: string,
        public activityDescription: string,
        public catagoryID: ObjectId,
        public id?: ObjectId,
    ) {}
}

export class Activities {
    constructor(
        public humanID: ObjectId, // links to human table
        public activityID: ObjectId, // links to activity table
        public activityDate: Date,
        public activityDurationHours: number,
        public id?: ObjectId,
    ) {}
}

export class Catagory {
    constructor(public catagoryName: string, public catagoryDescription: string, public id?: ObjectId) {}
}

export class calendarDate {
    constructor(public fullDate: Date, public wkNumber: number, public id?: ObjectId) {}
}
