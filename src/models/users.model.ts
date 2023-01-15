import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "users", timestamps: true, versionKey: false } })
class User {
  @prop({ type: String, required: false, unique: true })
  public email: string;

  @prop({ type: String, required: false })
  public password: string;

  @prop({ type: Number, required: false })
  public nonce: number; // wallet nonce

  @prop({ type: String, required: false, unique: true })
  public address: string;

  @prop({ type: String, required: false })
  public type: string; // wallet, email

  @prop({ type: String, required: false })
  public role: string; // admin, user

  @prop({ required: true, default: () => Date.now() })
  public createdAt: number;

  @prop({ required: true, default: () => Date.now() })
  public updatedAt: number;
}

const UserModel = getModelForClass(User);

export default UserModel;
