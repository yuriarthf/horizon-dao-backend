import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "users", timestamps: true } })
class User {
  @prop({ type: String, required: true, unique: true })
  public email: string;

  @prop({ type: String, required: true })
  public password: string;

  @prop({ type: String, required: false })
  public nonce: string;

  @prop({ type: String, required: false })
  public address: string;

  @prop({ type: String, required: false })
  public type: string;

  @prop({ type: String, required: false })
  public role: string;

  public createdAt?: Date;

  public updatedAt?: Date;
}

const UserModel = getModelForClass(User);

export default UserModel;
