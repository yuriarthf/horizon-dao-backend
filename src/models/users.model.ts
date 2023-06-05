import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "Users", timestamps: true, versionKey: false } })
class Users {
  @prop({ required: true, type: String })
  public address!: string;

  @prop({ required: true, type: Number })
  public nonce!: number;

  @prop({ required: true, type: String, default: "0" })
  public testTokensRequested!: string;

  @prop({ required: true, default: () => Date.now() })
  public createdAt: number;

  @prop({ required: true, default: () => Date.now() })
  public updatedAt: number;
}

const usersModel = getModelForClass(Users);

export default usersModel;
