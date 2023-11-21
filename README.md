# Advance Mongoose type Script Module 9

# **9-1 Introduction to validation**

1. https://mongoosejs.com/docs/validation.html#built-in-validators
2. 

```
import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './students/student.interface';

//create student schema
const userNameScheme = new Schema<UserName>({
  firstName: { type: String, required: [true,'First Name is Must be requires'] }, // custom error message provider codede 
  middleName: { type: String, required: false }, // not provide custom message 
  lastName: { type: String, required: [true,'Last Name is Must be Requires'] },
});

// create guridanSchema
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherContractNo: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContractNo: { type: String, required: true },
});

//create local  localGuargian schema
const localGuargianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contractNo: { type: String, required: true },
  address: { type: String, required: true },
});

// student Schema
const studentSchema = new Schema<Student>({
  id: { type: String, required: true , unique:true}, // unique id can be store database 
  name: {
    type :userNameScheme,
    required:[true,'First name must be Required']
  },
  //enum
  gender:{       // enum value handeling process  enum ,interface and type alies both are same 
    type:String,
    enum:{
      values:['male', 'female','other'],
      message:'{VALUE} is not supported' // this line mens if your provide custom value , the custom message show with user providing value
    },
    required:true
  },
  email: { type: String, required: true },
  dethOfBirth: { type: String, required: true },
  contractNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  //enum
  bloodGroup: {
    type:String,
    enum:{
      values:['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
      message:'The gender file can only  be one of the flowing : male or female' // enum custom message handeling process
    },
    required:false
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type:guardianSchema,    // guardi
    required:true
  },
  //enum
  isActive: {
    type :String,
    enum:['active', 'inActive'],
    default :'active'
  },
  profileImg: { type: String, required: false },
  localGuargian: {
    type:localGuargianSchema, // menula type 
    required:true
  },
});

// create model
//https://mongoosejs.com/docs/typescript.html
export const studentModel = model<Student>('student', studentSchema);
```

# ****9-2 How to do custom validation****

1. [https://mongoosejs.com/docs/7.x/docs/api/schemastring.html#SchemaString.prototype.trim()](https://mongoosejs.com/docs/7.x/docs/api/schemastring.html#SchemaString.prototype.trim())
2. https://mongoosejs.com/docs/7.x/docs/api/schemastringoptions.html#SchemaStringOptions.prototype.uppercase

```tsx
firstName: {
     type: String, 
     equired: [true,'First Name is Must be requires'],
     maxlength:[20,'First Name must be Maximun 20'],
     trim:true ,
     validate:{
      validator:function(Value:string){
        const firstName=Value.charAt(0).toUpperCase()+Value.slice(1);
        return firstName===Value;
       },
       message:'{VALUE} is not captinize formar'
     }
},
```

# **9-3 How to validate using validator and Joi package**

1.https://www.npmjs.com/package/validator 

2.https://github.com/validatorjs/validator.js

3.https://www.npmjs.com/package/@types/validator

// joi another validator 

1. https://www.npmjs.com/package/joi
2. 

# 9-4 joi validation

```tsx
import Joi from 'joi';

 //creating a schema validation using a joi
 const nameSchema = Joi.object({
    firstName: Joi.string()
      .required()
      .max(20)
      .regex(/^[A-Z][a-z]*$/)
      .message('{VALUE} is not in capitalized format'),
    middleName: Joi.string().allow(''),
    lastName: Joi.string()
      .required().pattern(/^[A-Za-z]+$/,'alpha').message('{VALUE} is not valide')
      
  });
  
  const guardianSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherContractNo: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContractNo: Joi.string().required(),
  });
  
  const localGuardianSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contractNo: Joi.string().required(),
    address: Joi.string().required(),
  });
  
  // Define the main student schema
  const studentSchema = Joi.object({
    id: Joi.string().required(),
    name: nameSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    email: Joi.string().email().required(),
    dateOfBirth: Joi.string(),
    contractNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid('A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianSchema.required(),
    isActive: Joi.string().valid('active', 'inActive').default('active'),
    profileImg: Joi.string().allow(''),
    localGuardian: localGuardianSchema.required(),
  });

  export default studentSchema;
```

https://joi.dev/api/?v=17.9.1#general-usage

https://www.npmjs.com/package/joi

# ****9-5 How to validate using zod****

1. https://zod.dev/?id=installation
2. 

```
import { z } from "zod";

const userNameSchema = z.object({
    firstName: z
      .string()
      .min(1,{message:'More Then 1 value accepted'})
      .max(20)
      .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
      }),
    middleName: z.string(),
    lastName: z.string(),
  });
  
  const guardianSchema = z.object({
    fatherName: z.string(),
    fatherOccupation: z.string(),
    fatherContactNo: z.string(),
    motherName: z.string(),
    motherOccupation: z.string(),
    motherContactNo: z.string(),
  });
  
  const localGuardianSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    contactNo: z.string(),
    address: z.string(),
  });
  
  export const studentValidationSchema = z.object({
    id: z.string(),
    name: userNameSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: z.string(),
    isActive: z.enum(['active', 'blocked']).default('active')

  });
  
export default studentValidationSchema;
```

[](https://www.notion.so/c25b866249b94d1888a87b1254c0e691?pvs=21)

# ****9-6 Implement a custom instance method****

1. https://mongoosejs.com/docs/typescript/statics-and-methods.html 
2. how to create custom funcations 

# **9-7 Implement a custom static method**

1. https://mongoosejs.com/docs/typescript/statics-and-methods.html
2. 

# ****9-8 Implement mongoose middleware part****

1. https://mongoosejs.com/docs/middleware.html
2. https://www.npmjs.com/package/bcrypt
3. npm i -D @types/bcrypt  

https://www.npmjs.com/package/@types/bcrypt

# 9-8 Virtual Memory

1.https://mongoosejs.com/docs/7.x/docs/tutorials/virtuals.html