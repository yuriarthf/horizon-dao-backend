import { prop, getModelForClass, modelOptions, plugin } from "@typegoose/typegoose";
import { typegoosePaginate, PaginateMethod } from "./plugins/typegoose-paginate";

@modelOptions({ schemaOptions: { timestamps: false, _id: false } })
class IROProposal {
  @prop({ type: Number, required: true })
  public tokenPrice!: number;

  @prop({ type: Number, required: true })
  public duration!: number;

  @prop({ type: Number, required: true })
  public tokenSupply!: number;

  @prop({ type: Number })
  public reservesFeePercentage?: number;

  @prop({ type: Number })
  public treasuryFeePercentage?: number;
}

@modelOptions({ schemaOptions: { timestamps: false, _id: false } })
class Attributes {
  @prop({ type: Number })
  public area?: number;

  @prop({ type: Number })
  public bedrooms?: number;

  @prop({ type: Number })
  public bathrooms?: number;

  @prop({ type: Number })
  public parking?: number;

  @prop({ type: Number })
  public yearBuilt?: number;

  @prop({ type: Number })
  public latitude?: number;

  @prop({ type: Number })
  public longitude?: number;
}

@modelOptions({ schemaOptions: { timestamps: false, _id: false } })
class TotalInvestmentValue {
  @prop({ type: Number })
  public total!: number;

  @prop({ type: Number })
  public assetPrice!: number;

  @prop({ type: Number })
  public closingCosts?: number;

  @prop({ type: Number })
  public transferTaxes!: number;

  @prop({ type: Number })
  public vacancyReserves!: number;

  @prop({ type: Number })
  public renovationReserves!: number;

  @prop({ type: Number })
  public upfrontSpvFees!: number;

  @prop({ type: Number })
  public tokenizationFees!: number;
}

@modelOptions({ schemaOptions: { timestamps: false, _id: false } })
class TotalReturns {
  @prop({ type: Number })
  public totalPercentage!: number;

  @prop({ type: Number })
  public projectedAppreciationPercentage?: number;

  @prop({ type: Number })
  public cashOnCashReturnPercentage!: number;
}

@modelOptions({ schemaOptions: { timestamps: false, _id: false } })
class AnnualGrossRents {
  @prop({ type: Number })
  public total!: number;

  @prop({ type: Number })
  public propertyTaxes!: number;

  @prop({ type: Number })
  public insurance!: number;

  @prop({ type: Number })
  public propertyManagement!: number;

  @prop({ type: Number })
  public spvFeelingFees!: number;

  @prop({ type: Number })
  public annualCashflow!: number;

  @prop({ type: Number })
  public monthlyCashflow!: number;
}

@modelOptions({ schemaOptions: { timestamps: false, _id: false } })
class Financials {
  @prop({ type: TotalInvestmentValue })
  public totalInvestmentValue!: TotalInvestmentValue;

  @prop({ type: TotalReturns })
  public totalReturns!: TotalReturns;

  @prop({ type: AnnualGrossRents })
  public annualGrossRents!: AnnualGrossRents;
}

@modelOptions({ schemaOptions: { timestamps: false, _id: false } })
class Chat {
  @prop({ type: String, required: true })
  public creator: string;

  @prop({ type: String, trim: true, required: true })
  public message!: string;

  @prop({ required: true, default: () => Date.now() })
  public createdAt: number;
}

@modelOptions({ schemaOptions: { timestamps: false, _id: false } })
class Update {
  @prop({ type: String, trim: true, required: true })
  public title!: string;

  @prop({ type: String, trim: true, required: true })
  public description!: string;

  @prop({ required: true, default: () => Date.now() })
  public createdAt: number;
}

@plugin(typegoosePaginate)
@modelOptions({ schemaOptions: { collection: "Property", timestamps: true } })
class Property {
  @prop({ type: Number })
  public iroId?: number;

  @prop({ type: Number })
  public realEstateNftId?: number;

  @prop({ type: String, trim: true, required: true })
  public name!: string;

  @prop({ type: String, trim: true })
  public description?: string;

  @prop({ type: String, trim: true, required: true })
  public type!: string;

  @prop({ type: String, trim: true, required: true })
  public creator!: string;

  @prop({ type: String, trim: true, required: true })
  public imageUrl!: string;

  @prop({ type: String, trim: true })
  public country?: string;

  @prop({ type: String, trim: true })
  public region?: string;

  @prop({ type: String, trim: true })
  public city?: string;

  @prop({ type: String, trim: true })
  public address?: string;

  @prop({ type: String, trim: true })
  public zip?: string;

  @prop({ type: String, trim: true })
  public market?: string;

  @prop({ type: String, trim: true })
  public highlights?: string;

  @prop({ type: String, trim: true })
  public documentsUrl?: string;

  @prop({ type: IROProposal, required: true })
  public iroProposal!: IROProposal;

  @prop({ type: Attributes })
  public attributes!: Attributes;

  @prop({ type: Financials })
  public financials!: Financials;

  @prop({ type: [Chat] })
  public discussions?: Chat[];

  @prop({ type: [Update] })
  public updates?: Update[];

  @prop({ required: true, default: () => Date.now() })
  public createdAt: number;

  @prop({ required: true, default: () => Date.now() })
  public updatedAt: number;

  static paginate: PaginateMethod<Property>;
}

const PropertyModel = getModelForClass(Property);

export default PropertyModel;
