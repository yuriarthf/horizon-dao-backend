// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace HorizonRealEstateTestTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Balance = {
  id: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  amount: Scalars['BigInt'];
  account: RealEstateAccount;
};

export type Balance_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  account_?: InputMaybe<RealEstateAccount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Balance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Balance_filter>>>;
};

export type Balance_orderBy =
  | 'id'
  | 'tokenId'
  | 'amount'
  | 'account';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type IRO = {
  id: Scalars['Bytes'];
  iroId: Scalars['BigInt'];
  status: Status;
  listingOwner: Scalars['Bytes'];
  unitPrice: Scalars['BigInt'];
  listingOwnerShare: Scalars['BigDecimal'];
  treasuryFee: Scalars['BigDecimal'];
  reservesFee: Scalars['BigDecimal'];
  currency: Scalars['Bytes'];
  currencyDecimals: Scalars['BigInt'];
  softCap: Scalars['BigInt'];
  hardCap: Scalars['BigInt'];
  start: Scalars['BigInt'];
  end: Scalars['BigInt'];
  totalFunding: Scalars['BigInt'];
  shares?: Maybe<Array<UserShare>>;
  fundsWithdrawn: Scalars['Boolean'];
  ownerClaimed: Scalars['Boolean'];
  realEstateId?: Maybe<Scalars['BigInt']>;
};


export type IROsharesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserShare_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserShare_filter>;
};

export type IROSet = {
  id: Scalars['Bytes'];
  entityIds?: Maybe<Array<Scalars['Bytes']>>;
  iroIds?: Maybe<Array<Scalars['BigInt']>>;
};

export type IROSet_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  entityIds?: InputMaybe<Array<Scalars['Bytes']>>;
  entityIds_not?: InputMaybe<Array<Scalars['Bytes']>>;
  entityIds_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  entityIds_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  entityIds_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  entityIds_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  iroIds?: InputMaybe<Array<Scalars['BigInt']>>;
  iroIds_not?: InputMaybe<Array<Scalars['BigInt']>>;
  iroIds_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  iroIds_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  iroIds_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  iroIds_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<IROSet_filter>>>;
  or?: InputMaybe<Array<InputMaybe<IROSet_filter>>>;
};

export type IROSet_orderBy =
  | 'id'
  | 'entityIds'
  | 'iroIds';

export type IRO_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  iroId?: InputMaybe<Scalars['BigInt']>;
  iroId_not?: InputMaybe<Scalars['BigInt']>;
  iroId_gt?: InputMaybe<Scalars['BigInt']>;
  iroId_lt?: InputMaybe<Scalars['BigInt']>;
  iroId_gte?: InputMaybe<Scalars['BigInt']>;
  iroId_lte?: InputMaybe<Scalars['BigInt']>;
  iroId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  iroId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<Status>;
  status_not?: InputMaybe<Status>;
  status_in?: InputMaybe<Array<Status>>;
  status_not_in?: InputMaybe<Array<Status>>;
  listingOwner?: InputMaybe<Scalars['Bytes']>;
  listingOwner_not?: InputMaybe<Scalars['Bytes']>;
  listingOwner_gt?: InputMaybe<Scalars['Bytes']>;
  listingOwner_lt?: InputMaybe<Scalars['Bytes']>;
  listingOwner_gte?: InputMaybe<Scalars['Bytes']>;
  listingOwner_lte?: InputMaybe<Scalars['Bytes']>;
  listingOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  listingOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  listingOwner_contains?: InputMaybe<Scalars['Bytes']>;
  listingOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  unitPrice?: InputMaybe<Scalars['BigInt']>;
  unitPrice_not?: InputMaybe<Scalars['BigInt']>;
  unitPrice_gt?: InputMaybe<Scalars['BigInt']>;
  unitPrice_lt?: InputMaybe<Scalars['BigInt']>;
  unitPrice_gte?: InputMaybe<Scalars['BigInt']>;
  unitPrice_lte?: InputMaybe<Scalars['BigInt']>;
  unitPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unitPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listingOwnerShare?: InputMaybe<Scalars['BigDecimal']>;
  listingOwnerShare_not?: InputMaybe<Scalars['BigDecimal']>;
  listingOwnerShare_gt?: InputMaybe<Scalars['BigDecimal']>;
  listingOwnerShare_lt?: InputMaybe<Scalars['BigDecimal']>;
  listingOwnerShare_gte?: InputMaybe<Scalars['BigDecimal']>;
  listingOwnerShare_lte?: InputMaybe<Scalars['BigDecimal']>;
  listingOwnerShare_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  listingOwnerShare_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  treasuryFee?: InputMaybe<Scalars['BigDecimal']>;
  treasuryFee_not?: InputMaybe<Scalars['BigDecimal']>;
  treasuryFee_gt?: InputMaybe<Scalars['BigDecimal']>;
  treasuryFee_lt?: InputMaybe<Scalars['BigDecimal']>;
  treasuryFee_gte?: InputMaybe<Scalars['BigDecimal']>;
  treasuryFee_lte?: InputMaybe<Scalars['BigDecimal']>;
  treasuryFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  treasuryFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reservesFee?: InputMaybe<Scalars['BigDecimal']>;
  reservesFee_not?: InputMaybe<Scalars['BigDecimal']>;
  reservesFee_gt?: InputMaybe<Scalars['BigDecimal']>;
  reservesFee_lt?: InputMaybe<Scalars['BigDecimal']>;
  reservesFee_gte?: InputMaybe<Scalars['BigDecimal']>;
  reservesFee_lte?: InputMaybe<Scalars['BigDecimal']>;
  reservesFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reservesFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  currency?: InputMaybe<Scalars['Bytes']>;
  currency_not?: InputMaybe<Scalars['Bytes']>;
  currency_gt?: InputMaybe<Scalars['Bytes']>;
  currency_lt?: InputMaybe<Scalars['Bytes']>;
  currency_gte?: InputMaybe<Scalars['Bytes']>;
  currency_lte?: InputMaybe<Scalars['Bytes']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  currencyDecimals?: InputMaybe<Scalars['BigInt']>;
  currencyDecimals_not?: InputMaybe<Scalars['BigInt']>;
  currencyDecimals_gt?: InputMaybe<Scalars['BigInt']>;
  currencyDecimals_lt?: InputMaybe<Scalars['BigInt']>;
  currencyDecimals_gte?: InputMaybe<Scalars['BigInt']>;
  currencyDecimals_lte?: InputMaybe<Scalars['BigInt']>;
  currencyDecimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currencyDecimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  softCap?: InputMaybe<Scalars['BigInt']>;
  softCap_not?: InputMaybe<Scalars['BigInt']>;
  softCap_gt?: InputMaybe<Scalars['BigInt']>;
  softCap_lt?: InputMaybe<Scalars['BigInt']>;
  softCap_gte?: InputMaybe<Scalars['BigInt']>;
  softCap_lte?: InputMaybe<Scalars['BigInt']>;
  softCap_in?: InputMaybe<Array<Scalars['BigInt']>>;
  softCap_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hardCap?: InputMaybe<Scalars['BigInt']>;
  hardCap_not?: InputMaybe<Scalars['BigInt']>;
  hardCap_gt?: InputMaybe<Scalars['BigInt']>;
  hardCap_lt?: InputMaybe<Scalars['BigInt']>;
  hardCap_gte?: InputMaybe<Scalars['BigInt']>;
  hardCap_lte?: InputMaybe<Scalars['BigInt']>;
  hardCap_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hardCap_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  start?: InputMaybe<Scalars['BigInt']>;
  start_not?: InputMaybe<Scalars['BigInt']>;
  start_gt?: InputMaybe<Scalars['BigInt']>;
  start_lt?: InputMaybe<Scalars['BigInt']>;
  start_gte?: InputMaybe<Scalars['BigInt']>;
  start_lte?: InputMaybe<Scalars['BigInt']>;
  start_in?: InputMaybe<Array<Scalars['BigInt']>>;
  start_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  end?: InputMaybe<Scalars['BigInt']>;
  end_not?: InputMaybe<Scalars['BigInt']>;
  end_gt?: InputMaybe<Scalars['BigInt']>;
  end_lt?: InputMaybe<Scalars['BigInt']>;
  end_gte?: InputMaybe<Scalars['BigInt']>;
  end_lte?: InputMaybe<Scalars['BigInt']>;
  end_in?: InputMaybe<Array<Scalars['BigInt']>>;
  end_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalFunding?: InputMaybe<Scalars['BigInt']>;
  totalFunding_not?: InputMaybe<Scalars['BigInt']>;
  totalFunding_gt?: InputMaybe<Scalars['BigInt']>;
  totalFunding_lt?: InputMaybe<Scalars['BigInt']>;
  totalFunding_gte?: InputMaybe<Scalars['BigInt']>;
  totalFunding_lte?: InputMaybe<Scalars['BigInt']>;
  totalFunding_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalFunding_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  shares?: InputMaybe<Array<Scalars['String']>>;
  shares_not?: InputMaybe<Array<Scalars['String']>>;
  shares_contains?: InputMaybe<Array<Scalars['String']>>;
  shares_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  shares_not_contains?: InputMaybe<Array<Scalars['String']>>;
  shares_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  shares_?: InputMaybe<UserShare_filter>;
  fundsWithdrawn?: InputMaybe<Scalars['Boolean']>;
  fundsWithdrawn_not?: InputMaybe<Scalars['Boolean']>;
  fundsWithdrawn_in?: InputMaybe<Array<Scalars['Boolean']>>;
  fundsWithdrawn_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  ownerClaimed?: InputMaybe<Scalars['Boolean']>;
  ownerClaimed_not?: InputMaybe<Scalars['Boolean']>;
  ownerClaimed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  ownerClaimed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  realEstateId?: InputMaybe<Scalars['BigInt']>;
  realEstateId_not?: InputMaybe<Scalars['BigInt']>;
  realEstateId_gt?: InputMaybe<Scalars['BigInt']>;
  realEstateId_lt?: InputMaybe<Scalars['BigInt']>;
  realEstateId_gte?: InputMaybe<Scalars['BigInt']>;
  realEstateId_lte?: InputMaybe<Scalars['BigInt']>;
  realEstateId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realEstateId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<IRO_filter>>>;
  or?: InputMaybe<Array<InputMaybe<IRO_filter>>>;
};

export type IRO_orderBy =
  | 'id'
  | 'iroId'
  | 'status'
  | 'listingOwner'
  | 'unitPrice'
  | 'listingOwnerShare'
  | 'treasuryFee'
  | 'reservesFee'
  | 'currency'
  | 'currencyDecimals'
  | 'softCap'
  | 'hardCap'
  | 'start'
  | 'end'
  | 'totalFunding'
  | 'shares'
  | 'fundsWithdrawn'
  | 'ownerClaimed'
  | 'realEstateId';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  iroset?: Maybe<IROSet>;
  irosets: Array<IROSet>;
  userShare?: Maybe<UserShare>;
  userShares: Array<UserShare>;
  iro?: Maybe<IRO>;
  iros: Array<IRO>;
  balance?: Maybe<Balance>;
  balances: Array<Balance>;
  realEstateAccount?: Maybe<RealEstateAccount>;
  realEstateAccounts: Array<RealEstateAccount>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryirosetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryirosetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IROSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<IROSet_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserShareArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserSharesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserShare_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserShare_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryiroArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryirosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IRO_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<IRO_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Balance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Balance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrealEstateAccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrealEstateAccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RealEstateAccount_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RealEstateAccount_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type RealEstateAccount = {
  id: Scalars['Bytes'];
  address: Scalars['Bytes'];
  balances?: Maybe<Array<Balance>>;
};


export type RealEstateAccountbalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Balance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Balance_filter>;
};

export type RealEstateAccount_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  balances?: InputMaybe<Array<Scalars['String']>>;
  balances_not?: InputMaybe<Array<Scalars['String']>>;
  balances_contains?: InputMaybe<Array<Scalars['String']>>;
  balances_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  balances_not_contains?: InputMaybe<Array<Scalars['String']>>;
  balances_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  balances_?: InputMaybe<Balance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RealEstateAccount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RealEstateAccount_filter>>>;
};

export type RealEstateAccount_orderBy =
  | 'id'
  | 'address'
  | 'balances';

export type Status =
  | 'PENDING'
  | 'ONGOING'
  | 'SUCCESS'
  | 'FAIL';

export type Subscription = {
  iroset?: Maybe<IROSet>;
  irosets: Array<IROSet>;
  userShare?: Maybe<UserShare>;
  userShares: Array<UserShare>;
  iro?: Maybe<IRO>;
  iros: Array<IRO>;
  balance?: Maybe<Balance>;
  balances: Array<Balance>;
  realEstateAccount?: Maybe<RealEstateAccount>;
  realEstateAccounts: Array<RealEstateAccount>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionirosetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionirosetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IROSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<IROSet_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserShareArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserSharesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserShare_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserShare_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioniroArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionirosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IRO_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<IRO_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Balance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Balance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrealEstateAccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrealEstateAccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RealEstateAccount_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RealEstateAccount_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type UserShare = {
  id: Scalars['Bytes'];
  address: Scalars['Bytes'];
  committedFunds: Scalars['BigInt'];
  amount: Scalars['BigInt'];
  share: Scalars['BigDecimal'];
  claimed: Scalars['Boolean'];
  iro: IRO;
};

export type UserShare_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  committedFunds?: InputMaybe<Scalars['BigInt']>;
  committedFunds_not?: InputMaybe<Scalars['BigInt']>;
  committedFunds_gt?: InputMaybe<Scalars['BigInt']>;
  committedFunds_lt?: InputMaybe<Scalars['BigInt']>;
  committedFunds_gte?: InputMaybe<Scalars['BigInt']>;
  committedFunds_lte?: InputMaybe<Scalars['BigInt']>;
  committedFunds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  committedFunds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  share?: InputMaybe<Scalars['BigDecimal']>;
  share_not?: InputMaybe<Scalars['BigDecimal']>;
  share_gt?: InputMaybe<Scalars['BigDecimal']>;
  share_lt?: InputMaybe<Scalars['BigDecimal']>;
  share_gte?: InputMaybe<Scalars['BigDecimal']>;
  share_lte?: InputMaybe<Scalars['BigDecimal']>;
  share_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  share_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  claimed?: InputMaybe<Scalars['Boolean']>;
  claimed_not?: InputMaybe<Scalars['Boolean']>;
  claimed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  claimed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  iro_?: InputMaybe<IRO_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UserShare_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UserShare_filter>>>;
};

export type UserShare_orderBy =
  | 'id'
  | 'address'
  | 'committedFunds'
  | 'amount'
  | 'share'
  | 'claimed'
  | 'iro';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  iroset: InContextSdkMethod<Query['iroset'], QueryirosetArgs, MeshContext>,
  /** null **/
  irosets: InContextSdkMethod<Query['irosets'], QueryirosetsArgs, MeshContext>,
  /** null **/
  userShare: InContextSdkMethod<Query['userShare'], QueryuserShareArgs, MeshContext>,
  /** null **/
  userShares: InContextSdkMethod<Query['userShares'], QueryuserSharesArgs, MeshContext>,
  /** null **/
  iro: InContextSdkMethod<Query['iro'], QueryiroArgs, MeshContext>,
  /** null **/
  iros: InContextSdkMethod<Query['iros'], QueryirosArgs, MeshContext>,
  /** null **/
  balance: InContextSdkMethod<Query['balance'], QuerybalanceArgs, MeshContext>,
  /** null **/
  balances: InContextSdkMethod<Query['balances'], QuerybalancesArgs, MeshContext>,
  /** null **/
  realEstateAccount: InContextSdkMethod<Query['realEstateAccount'], QueryrealEstateAccountArgs, MeshContext>,
  /** null **/
  realEstateAccounts: InContextSdkMethod<Query['realEstateAccounts'], QueryrealEstateAccountsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  iroset: InContextSdkMethod<Subscription['iroset'], SubscriptionirosetArgs, MeshContext>,
  /** null **/
  irosets: InContextSdkMethod<Subscription['irosets'], SubscriptionirosetsArgs, MeshContext>,
  /** null **/
  userShare: InContextSdkMethod<Subscription['userShare'], SubscriptionuserShareArgs, MeshContext>,
  /** null **/
  userShares: InContextSdkMethod<Subscription['userShares'], SubscriptionuserSharesArgs, MeshContext>,
  /** null **/
  iro: InContextSdkMethod<Subscription['iro'], SubscriptioniroArgs, MeshContext>,
  /** null **/
  iros: InContextSdkMethod<Subscription['iros'], SubscriptionirosArgs, MeshContext>,
  /** null **/
  balance: InContextSdkMethod<Subscription['balance'], SubscriptionbalanceArgs, MeshContext>,
  /** null **/
  balances: InContextSdkMethod<Subscription['balances'], SubscriptionbalancesArgs, MeshContext>,
  /** null **/
  realEstateAccount: InContextSdkMethod<Subscription['realEstateAccount'], SubscriptionrealEstateAccountArgs, MeshContext>,
  /** null **/
  realEstateAccounts: InContextSdkMethod<Subscription['realEstateAccounts'], SubscriptionrealEstateAccountsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["horizon-real-estate-test"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
