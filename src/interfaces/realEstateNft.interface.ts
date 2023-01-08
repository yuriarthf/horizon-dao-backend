interface Attribute {
  value: string;
  trait_type: string;
}

export interface RealEstateNFTMetadata {
  name?: string;
  description?: string;
  image?: string;
  attributes?: Attribute[];
  external_url?: string;
}
