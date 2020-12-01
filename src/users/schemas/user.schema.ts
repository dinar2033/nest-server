import * as mongoose from 'mongoose'
import { roleEnum } from '../enums/role.enum'

export const UserSchema = new mongoose.Schema ({
  login: {type: String, required: true},
  password: {type: String, required: true},
  rank: {type: String, required: true},
  role: {type: [String], required: true, enum: Object.values(roleEnum)},
  groupnumber: {type: String, required: true}
});
