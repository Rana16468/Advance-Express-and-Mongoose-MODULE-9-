import { Request, Response } from "express";
import { StudentService } from "./student.services";
import TStudentValidationSchema from "./student.zod.validations";


// create student 
const createStudent= async(req:Request,res:Response)=>{

    try{
        const student=req.body;

        // zod validation 
        const studentValidtion=TStudentValidationSchema.parse(student);
        //zod validation data  store in the database
       const result= await StudentService.createStudentIntoDb(studentValidtion);
       res.status(200).send({success:true,message:'successfully student create',data:result});
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error:any){
        res.status(500).send({success:false,message:'some thing went wrong',errorMessage:error.message})
    }
   
}

//find all student
const findAllStudend=async(req:Request,res:Response)=>{

   try{
     const result=await StudentService.getallStudentData();
     res.status(200).send({success:true,message:'successfully all student find',data:result});
   }
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   catch(error:any){
    
    res.status(500).send({success:false,message:'some thing went wrong',errorMessage:error.message})
   }
    
}

//get specific student  data

const specificStudentFind=async(req:Request,res:Response)=>{

    try{
        const {studentId}=req.params;
        const result=await StudentService.specificStudentData(studentId);
        res.status(200).send({success:true,message:'successfully find specific student data',data:result});
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error:any){
        res.status(500).send({success:false,message:'some thing went wrong',errorMessage:error.message})
    }

}

// create delete functiom 
const isDeletedUpdateOne= async(req:Request,res:Response)=>{

    try{
        const {studentId}=req.params;
        const result=await StudentService.isDeletedStudentData(studentId);
        res.status(200).send({success:true,message:'successfully deleted the student',data:result});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error:any){
        res.status(500).send({success:false,message:'some thing went wrong',errorMessage:error.message})
    }
}

export const StudentController={
    createStudent,
    findAllStudend,
    specificStudentFind,
    isDeletedUpdateOne
}