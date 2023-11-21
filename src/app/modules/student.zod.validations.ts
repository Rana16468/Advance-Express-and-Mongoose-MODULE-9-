import { z } from "zod";

// Define Zod schema for the UserName
const TUserNameSchema = z.object({
  firstName: z.string().min(1,{message:'First Name is Min 1 Character Accepted'}).max(30,{message:'First Name Maximun Length 30 character'}).refine((value) => /^[A-Z]/.test(value),{
    message:'First Name must start with a capital letter'
  }),
  middleName: z.string().min(0).max(255).optional(),
  lastName: z.string().min(1).max(255),
});

// Define Zod schema for the Address
const TAddressSchema = z.object({
  premanentAdreess: z.string().min(0).max(50).optional(),
  presentAddress: z.string().min(1).max(50),
});

// Define Zod schema for the Guardian
const TGuardianSchema = z.object({
  fatherName: z.string().min(1).max(255),
  fatherOccupation: z.string().min(1).max(255),
  fatherPhoneNumber: z.string().min(1).max(11), // Assuming a reasonable phone number length
  motherName: z.string().min(1).max(255),
  motherOccupation: z.string().min(1).max(255),
  motherPhoneNumber: z.string().min(1).max(11), // Assuming a reasonable phone number length
});

// Define Zod schema for the LocalGuardian
const TLocalGuardianSchema = z.object({
  name: z.string().min(1).max(255),
  occupation: z.string().min(1).max(255),
  phoneNumber: z.string().min(1).max(20), // Assuming a reasonable phone number length
});

// Define Zod schema for the AcademicResult
const TAcademicResultSchema = z.object({
  institutionLocation: z.string().min(1).max(255),
  institutionName: z.string().min(1).max(255),
  result: z.string().min(1).max(255),
});

// Define Zod schema for the Student
const TStudentValidationSchema = z.object({
  id: z.string(),
  password:z.string().min(6,{message:'min 6 character needed'}).max(20),
  name: TUserNameSchema,
  email: z.string().min(1).max(50).email(),
  gender: z.enum(["Male", "Female"]),
  phoneNumber: z.string().min(1).max(11,{message:'Max Length 11 character Required'}), // Assuming a reasonable phone number length
  emergencyPhoneNumber: z.string().min(1).max(11,{message:'Max Length 11 character Required'}), // Assuming a reasonable phone number length
  address: TAddressSchema,
  guardian: TGuardianSchema,
  localGuardian: TLocalGuardianSchema,
  deathofBirth: z.string(),
  profileImg: z.string().optional(),
  isActive: z.enum(["isActive", "blocked"]),
  extracurricularActivities: z.array(z.string()),
  academicResult: z.array(TAcademicResultSchema),
  bloodGroup: z.enum(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"]),
  isDeleted:z.boolean().optional()
});

export default TStudentValidationSchema;


