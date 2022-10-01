import { dbCall } from '../../services/dbManager';

export default defineEventHandler(async event => {

    
   let dbData = await dbCall()
   return dbData
})