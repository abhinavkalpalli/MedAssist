import { Schema,model } from "mongoose"

export interface Admin{
    email:string,
    password:string
}
const adminSchema =new Schema<Admin>({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})
export default model<Admin>('Admins', adminSchema);