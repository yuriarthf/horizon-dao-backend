import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: false, _id: false } })
class AttributesDraft {
  @prop({ type: Number })
  public area: number;

  @prop({ type: Number })
  public bedrooms: number;

  @prop({ type: Number })
  public bathrooms: number;

  @prop({ type: Number })
  public parking: number;

  @prop({ type: Number })
  public yearBuilt: number;

  @prop({ type: Number })
  public latitude: number;

  @prop({ type: Number })
  public longitude: number;
}

@modelOptions({ schemaOptions: { timestamps: false, _id: false } })
class FinancialsDraft {
  @prop({ type: Number })
  public assetPrice: number;

  @prop({ type: Number })
  public tokenPrice: number;

  @prop({ type: Number })
  public tokenSupply: number;

  @prop({ type: Number })
  public monthlyCashflow: number;
}

@modelOptions({ schemaOptions: { collection: "PropertyDraft", timestamps: true, versionKey: false } })
export class PropertyDraft {
  @prop({ type: String, required: true })
  public creator!: string;

  @prop({ type: String })
  public name: string;

  @prop({ type: String })
  public imageUrl: string;

  @prop({ type: String })
  public documentsUrl: string;

  @prop({ type: String })
  public country: string;

  @prop({ type: String })
  public region: string;

  @prop({ type: String })
  public city: string;

  @prop({ type: String })
  public address: string;

  @prop({ type: String })
  public zip: string;

  @prop({ type: String })
  public type: string;

  @prop({ type: AttributesDraft })
  public attributes: AttributesDraft;

  @prop({ type: FinancialsDraft })
  public financialInput: FinancialsDraft;

  @prop({ type: String })
  public highlights: string;

  @prop({ type: String })
  public market: string;
}

const propertyDraftModel = getModelForClass(PropertyDraft);

export default propertyDraftModel;
