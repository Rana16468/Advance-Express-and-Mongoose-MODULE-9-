import { Student } from "../student.model";
import { TStudent } from "./students.interface"

const createStudentIntoDb=async(studentData:TStudent)=>{

   // const result=await Student.create(studentData);
  // buildin  mongodb Instance meyhod 


  const buildInInstanseInsert=new Student(studentData); // create instance 

  if(await Student.isUserExists(studentData.id))
  {

    throw new Error('student alreay exist')
  }
 
  const result=buildInInstanseInsert.save()
  return result;
}
const getallStudentData=async()=>{

    const result=await Student.find();
    return result;

}

const specificStudentData=async(id:string)=>{

    const result=await Student.aggregate([{$match:{id:id}}]);
    return result;

}

const isDeletedStudentData=async(id:string)=>{

 const result=await Student.updateOne({id},{ isDeleted:true});
 return result;

}
export const StudentService={
    createStudentIntoDb,
    getallStudentData,
    specificStudentData,
    isDeletedStudentData

}