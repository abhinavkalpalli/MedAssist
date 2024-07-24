import { Schema,model,Document } from "mongoose"

export interface Admin extends Document{
    email:string,
    password:string,
    is_Verified:boolean
}
const adminSchema =new Schema<Admin>({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    is_Verified:{type:Boolean,default:false}
})
export default model<Admin>('Admins', adminSchema);