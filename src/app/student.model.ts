import {  Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import { TStudent, 
    TUserName,
     TAddress,
      TGuardian, 
      TLocalGuardian, 
      TAcademicResult,
      StudentMethodModel,
     } from './modules/students.interface';
import config from './config';


//user Name Schema 
const TUserNameSchema=new Schema<TUserName>({
    firstName:{type:String,required:[true,'First Name is Required']},
    middleName:{type:String,required:[false,'Middle Name is Not Requires']},
    lastName:{type:String,required:[true,'Last Name is Requires']}

});
//user Address Schema 
const TAddressSchema=new Schema<TAddress>({
    premanentAdreess:{type:String,required:[false,'Premanent Address is Requires']},
    presentAddress:{type:String,required:[true,'Present Address is Requires']}
});

// create guardian schema 
const TGuardianSchema =new Schema<TGuardian>({

    fatherName:{type:String,required:[true,'Father Name is Requires']},
    fatherOccupation:{type:String,required:[true,'Father Occupation is Requires']},
    fatherPhoneNumber:{type:String,required:[true,'Father Phone Number is Requires']},
    motherName:{type:String,required:[true,'Mother Name is Required']},
    motherOccupation:{type:String,required:[true,'Mother Occupation is Required']},
    motherPhoneNumber:{type:String,required:[true,'Mother Phone Number is Requires']}
});
// create local Guardian schema 
const TLocalGuardianSchema=new Schema<TLocalGuardian>({
    name:{type:String,required:[true,'Local Guardian Name is Requires']},
    occupation:{type:String,required:[true,'Local Guardian Occuation is Required']},
    phoneNumber:{type:String,required:[true,'Phone Number is Required']}
});

//Academic  Result Schema

const TAcademicResultSchema=new Schema<TAcademicResult>({
    institutionLocation:{type:String,required:[true,'Institution Localtion is Requires']},
    institutionName:{type:String,required:[true,'Institution Name is Required']},
    result:{type:String,required:[true,'Result is Requires']}

})

const   TStudentSchema =new Schema<TStudent,StudentMethodModel>({
  id:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  name:{type:TUserNameSchema,required:[true,'Name is Requires']},
  email:{type:String, unique:true,required:[true,'Email is Requires']},
  gender:{
    type:String,
    enum:{
        values:['Male', 'Female'],
        message:"{VALUE} IS NOT Requires"
    },
    required:[true,'Gender is Requires'],
  },
  phoneNumber:{type:String,required:[true,'Phone Number is Requires']},
  emergencyPhoneNumber:{type:String,required:[true,'Emergency Phone is Required']},
  address:{type: TAddressSchema,required:[true,'Address is Requires']},
  guardian:{type:TGuardianSchema ,required:[true,'Guardian is Required']},
  localGuardian:{type:TLocalGuardianSchema,required:[true,'Local Guardian is Required']},
  deathofBirth:{type:String,required:[true,'Death of Birth is Required']},
  profileImg:{type:String,required:[false,'Profile Img is Not Required']},
  isActive:{
    type:String,
    enum:{
         values:['isActive','blocked'],
         message:'{VALUE} is not Required'
    },
    required:[true,'Active Information is Required']
  },
  extracurricularActivities:{type:[String],required:[true,'Extracurricular Activities is Required']},
  academicResult:{type:[TAcademicResultSchema],required:[true,'Academic Result is Required']},
  bloodGroup:{
    type:String,
    enum:{
        values:['A+' , 'B+' , 'AB+' , 'O+' , 'A-' , 'B-' , 'AB-' , 'O-'],
        message:'{VALUE} is Not Required'
    },
    required:[true,'Blood Group is Required']
    
  },
  isDeleted:{type:Boolean,required:false,default:false}
},{
  toJSON:{virtuals:true}
  
});

// document middlewere
TStudentSchema.pre('save',async function(next){

  

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user=this;
  user.password=await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds));
  user.profileImg=await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds));


  next();
})

TStudentSchema.post('save',function(doc,next){
  doc.password='';
  doc.profileImg='';
 next();
 
});

//query middlewere 
TStudentSchema.pre('find',function(next){
  this.find({isDeleted:{$ne:true}}); 
 next();
 
});

TStudentSchema.pre('findOne',function(next){
  this.find({isDeleted:{$ne:true}}); 
 next();
 
});
TStudentSchema.pre('aggregate',function(next){
  this.pipeline().unshift({$match:{isDeleted:{$ne:true}}})
  next();
  
 });


//static method
TStudentSchema.statics.isUserExists=async function(id:string)
{

  const existingStudent=await Student.findOne({id});
  return existingStudent;

}

// virtual middleware 
TStudentSchema.virtual('fullName').get(function(){
  return this.name.firstName.concat(' ').concat(this.name.middleName??'').concat(' ').concat(this.name.lastName)

})

export const Student= model<TStudent,StudentMethodModel>('student',TStudentSchema);

