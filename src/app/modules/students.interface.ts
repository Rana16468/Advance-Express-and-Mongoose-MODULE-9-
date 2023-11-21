import { Model } from "mongoose";

export type TUserName={

    firstName:string;
    middleName?:string;
    lastName:string;
}
export type TAddress={
    presentAddress:string;
    premanentAdreess?:string;
}
export type TGuardian={
    fatherName:string;
    fatherOccupation:string;
    fatherPhoneNumber:string;
    motherName:string;
    motherOccupation:string;
    motherPhoneNumber:string;

}
export type TLocalGuardian={
    name:string;
    occupation:string;
    phoneNumber:string;
}

export type TAcademicResult={
    institutionName:string;
    result:string;
    institutionLocation:string;
    
}


export type TStudent={
    id:string;
    password:string;
    name:TUserName;
    email:string;
    gender:'Male' | 'Female';
    phoneNumber:string;
    emergencyPhoneNumber:string;
    address:TAddress;
    guardian:TGuardian;
    localGuardian:TLocalGuardian;
    deathofBirth:string;
    profileImg?: string;
    isActive: 'isActive' | 'blocked';
    extracurricularActivities:string[];
    academicResult: Array<TAcademicResult>
    bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-';
    isDeleted?:boolean;
}



// instance method

/*export type StudentMethod={
    isUserExists(id:string):Promise<TStudent | null>
}

export type StudentMethodModel=Model<TStudent,StudentMethodModel,StudentMethod>;*/

// static method

export interface StudentMethodModel extends Model<TStudent>{

    // eslint-disable-next-line no-unused-vars
    isUserExists(id:string):Promise<TStudent | null>
}
