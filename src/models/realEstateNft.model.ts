import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: false, _id: false } })
class Attribute {
  @prop({ type: String, required: true })
  public value!: string;

  @prop({ type: String, required: true })
  public trait_type!: string;
}

@modelOptions({ schemaOptions: { collection: "RealEstateNFT", timestamps: false, versionKey: false } })
class RealEstateNFT {
  @prop({ type: Number, required: true })
  public _id!: number;

  @prop({ type: String })
  public name?: string;

  @prop({ type: String, trim: true })
  public description?: string;

  @prop({ type: String, trim: true })
  public image?: string;

  @prop({ type: [Attribute] })
  public attributes?: Attribute[];

  @prop({ type: String })
  public external_url?: string;
}

const RealEstateNFTModel = getModelForClass(RealEstateNFT);

export default RealEstateNFTModel;
