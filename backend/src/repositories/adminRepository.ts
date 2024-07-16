import Admins,{Admin} from '../models/adminModel'
import { IadminRepository } from './interfaces/IadminRepository'

export default class adminRepository implements IadminRepository{
    async signupAdmin(userData: Partial<Admin>): Promise<Admin | null> {
        try{
            const data=await Admins.findOne({email:userData.email})
            if(data){
                return null
            }
            return await Admins.create(userData)
        }catch(err){
            throw err
        }
    }
}