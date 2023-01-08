import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "users", timestamps: true } })
class User {
  @prop({ type: String, required: false, unique: true })
  public email: string;

  @prop({ type: String, required: false })
  public password: string;

  @prop({ type: String, required: false })
  public nonce: string; // wallet nonce

  @prop({ type: String, required: false, unique: true })
  public address: string;

  @prop({ type: String, required: false })
  public type: string; // wallet, email

  @prop({ type: String, required: false })
  public role: string; // admin, user

  public createdAt?: Date;

  public updatedAt?: Date;
}

const UserModel = getModelForClass(User);

export default UserModel;
