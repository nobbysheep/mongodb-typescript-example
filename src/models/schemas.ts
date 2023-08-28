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
        public catagoryID: string,
        public id?: ObjectId,
    ) {}
}

export class Activities {
    constructor(
        public humanID: string, // links to human table
        public activitiesID: string, // links to activity table
        public activitiesDateID: string, // links to dates table
        public activitiesDurationHours: number,
        public id?: ObjectId,
    ) {}
}

export class Catagory {
    constructor(public catagoryName: string, public catagoryDescription: string, public id?: ObjectId) {}
}

export class CalendarDate {
    constructor(public fullDate: Date, public wkNumber: number, public id?: ObjectId) {}
}

export class CalendarForHuman {
    constructor(
        public fullDate: Date,
        public wkNumber: number,
        public nameOfHuman: string,
        public activityName: string,
        public activityDurationHours: number,
        public catagoryName: string
    ) {}
}

