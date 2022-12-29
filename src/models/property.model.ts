import { prop, getModelForClass, modelOptions, plugin } from "@typegoose/typegoose";
import paginationPlugin, { PaginateModel } from 'typegoose-cursor-pagination';

@plugin(paginationPlugin)
@modelOptions({ schemaOptions: { timestamps: false, id: false } })
class Attributes {
  @prop({ type: Number })
  public lotSizeSqm?: string;

  @prop({ type: Number })
  public usableAreaSqm?: number;

  @prop({ type: Number })
  public bedrooms?: number;

  @prop({ type: Number })
  public bathrooms?: number;

  @prop({ type: Number })
  public parking?: number;

  @prop({ type: Number })
  public yearBuilt?: number;

  @prop({ type: String })
  public latitude?: string;

  @prop({ type: String })
  public longitude?: string;

  @prop({ type: Number })
  public laserShooter?: number;
}

@modelOptions({ schemaOptions: { timestamps: false, id: false } })
class Financials {
  @prop({ type: Number })
  public assetPrice?: number;

  @prop({ type: Number })
  public annualCashflow?: number;

  @prop({ type: Number })
  public monthlyCashflow?: number;

  @prop({ type: Number })
  public closingCosts?: number;

  @prop({ type: Number })
  public insurancePremium?: number;

  @prop({ type: Number })
  public propertyTaxPercentage?: number;

  @prop({ type: Number })
  public managementFeePercentage?: number;

  @prop({ type: Number })
  public commonFeePercentage?: number;
}

@modelOptions({ schemaOptions: { collection: "users", timestamps: true } })
class Update {
  @prop({ type: String, trim: true, required: true })
  public message!: string;

  @prop({ type: Date, required: true })
  public date!: Date;
}

@modelOptions({ schemaOptions: { collection: "users", timestamps: true } })
class Property {
  @prop({ type: Number })
  public iroId?: number;

  @prop({ type: Number})
  public realEstateNftId?: number;

  @prop({ type: String, trim: true, required: true })
  public name!: string;

  @prop({ type: String, trim: true, required: true })
  public type!: string;

  @prop({ type: String, trim: true, required: true })
  public creator!: string;

  @prop({ type: String, trim: true })
  public description?: string;

  @prop({ type: String, trim: true, required: true })
  public imageUrl!: string;

  @prop({ type: String, trim: true, required: true })
  public status!: string;

  @prop({ type: String, trim: true })
  public country?: string;

  @prop({ type: String, trim: true })
  public region?: string;

  @prop({ type: String, trim: true })
  public city?: string;

  @prop({ type: String, trim: true })
  public address?: string;

  @prop({ type: String, trim: true })
  public highlights?: string;

  @prop({ type: Attributes })
  public attributes?: Attributes;

  @prop({ type: Financials })
  public financials?: Financials;

  @prop({ type: String, trim: true })
  public documentsUrl?: string;

  @prop({ type: [Update] })
  public updates?: Update[];
}

const PropertyModel = getModelForClass(Property) as PaginateModel<Property, typeof Property>;

export default PropertyModel;
