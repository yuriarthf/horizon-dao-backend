// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { HorizonRealEstateTestTypes } from './sources/horizon-real-estate-test/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Balance: ResolverTypeWrapper<Balance>;
  Balance_filter: Balance_filter;
  Balance_orderBy: Balance_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IRO: ResolverTypeWrapper<IRO>;
  IROSet: ResolverTypeWrapper<IROSet>;
  IROSet_filter: IROSet_filter;
  IROSet_orderBy: IROSet_orderBy;
  IRO_filter: IRO_filter;
  IRO_orderBy: IRO_orderBy;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  RealEstateAccount: ResolverTypeWrapper<RealEstateAccount>;
  RealEstateAccount_filter: RealEstateAccount_filter;
  RealEstateAccount_orderBy: RealEstateAccount_orderBy;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  UserShare: ResolverTypeWrapper<UserShare>;
  UserShare_filter: UserShare_filter;
  UserShare_orderBy: UserShare_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Balance: Balance;
  Balance_filter: Balance_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  IRO: IRO;
  IROSet: IROSet;
  IROSet_filter: IROSet_filter;
  IRO_filter: IRO_filter;
  Int: Scalars['Int'];
  Query: {};
  RealEstateAccount: RealEstateAccount;
  RealEstateAccount_filter: RealEstateAccount_filter;
  String: Scalars['String'];
  Subscription: {};
  UserShare: UserShare;
  UserShare_filter: UserShare_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Balance'] = ResolversParentTypes['Balance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['RealEstateAccount'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type IROResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['IRO'] = ResolversParentTypes['IRO']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  iroId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  listingOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  unitPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listingOwnerShare?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  treasuryFee?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  reservesFee?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  currencyDecimals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  softCap?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  hardCap?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  start?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  end?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalFunding?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  shares?: Resolver<Maybe<Array<ResolversTypes['UserShare']>>, ParentType, ContextType, RequireFields<IROsharesArgs, 'skip' | 'first'>>;
  fundsWithdrawn?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ownerClaimed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  realEstateId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IROSetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['IROSet'] = ResolversParentTypes['IROSet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  entityIds?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  iroIds?: Resolver<Maybe<Array<ResolversTypes['BigInt']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  iroset?: Resolver<Maybe<ResolversTypes['IROSet']>, ParentType, ContextType, RequireFields<QueryirosetArgs, 'id' | 'subgraphError'>>;
  irosets?: Resolver<Array<ResolversTypes['IROSet']>, ParentType, ContextType, RequireFields<QueryirosetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  userShare?: Resolver<Maybe<ResolversTypes['UserShare']>, ParentType, ContextType, RequireFields<QueryuserShareArgs, 'id' | 'subgraphError'>>;
  userShares?: Resolver<Array<ResolversTypes['UserShare']>, ParentType, ContextType, RequireFields<QueryuserSharesArgs, 'skip' | 'first' | 'subgraphError'>>;
  iro?: Resolver<Maybe<ResolversTypes['IRO']>, ParentType, ContextType, RequireFields<QueryiroArgs, 'id' | 'subgraphError'>>;
  iros?: Resolver<Array<ResolversTypes['IRO']>, ParentType, ContextType, RequireFields<QueryirosArgs, 'skip' | 'first' | 'subgraphError'>>;
  balance?: Resolver<Maybe<ResolversTypes['Balance']>, ParentType, ContextType, RequireFields<QuerybalanceArgs, 'id' | 'subgraphError'>>;
  balances?: Resolver<Array<ResolversTypes['Balance']>, ParentType, ContextType, RequireFields<QuerybalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  realEstateAccount?: Resolver<Maybe<ResolversTypes['RealEstateAccount']>, ParentType, ContextType, RequireFields<QueryrealEstateAccountArgs, 'id' | 'subgraphError'>>;
  realEstateAccounts?: Resolver<Array<ResolversTypes['RealEstateAccount']>, ParentType, ContextType, RequireFields<QueryrealEstateAccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type RealEstateAccountResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RealEstateAccount'] = ResolversParentTypes['RealEstateAccount']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  balances?: Resolver<Maybe<Array<ResolversTypes['Balance']>>, ParentType, ContextType, RequireFields<RealEstateAccountbalancesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  iroset?: SubscriptionResolver<Maybe<ResolversTypes['IROSet']>, "iroset", ParentType, ContextType, RequireFields<SubscriptionirosetArgs, 'id' | 'subgraphError'>>;
  irosets?: SubscriptionResolver<Array<ResolversTypes['IROSet']>, "irosets", ParentType, ContextType, RequireFields<SubscriptionirosetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  userShare?: SubscriptionResolver<Maybe<ResolversTypes['UserShare']>, "userShare", ParentType, ContextType, RequireFields<SubscriptionuserShareArgs, 'id' | 'subgraphError'>>;
  userShares?: SubscriptionResolver<Array<ResolversTypes['UserShare']>, "userShares", ParentType, ContextType, RequireFields<SubscriptionuserSharesArgs, 'skip' | 'first' | 'subgraphError'>>;
  iro?: SubscriptionResolver<Maybe<ResolversTypes['IRO']>, "iro", ParentType, ContextType, RequireFields<SubscriptioniroArgs, 'id' | 'subgraphError'>>;
  iros?: SubscriptionResolver<Array<ResolversTypes['IRO']>, "iros", ParentType, ContextType, RequireFields<SubscriptionirosArgs, 'skip' | 'first' | 'subgraphError'>>;
  balance?: SubscriptionResolver<Maybe<ResolversTypes['Balance']>, "balance", ParentType, ContextType, RequireFields<SubscriptionbalanceArgs, 'id' | 'subgraphError'>>;
  balances?: SubscriptionResolver<Array<ResolversTypes['Balance']>, "balances", ParentType, ContextType, RequireFields<SubscriptionbalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  realEstateAccount?: SubscriptionResolver<Maybe<ResolversTypes['RealEstateAccount']>, "realEstateAccount", ParentType, ContextType, RequireFields<SubscriptionrealEstateAccountArgs, 'id' | 'subgraphError'>>;
  realEstateAccounts?: SubscriptionResolver<Array<ResolversTypes['RealEstateAccount']>, "realEstateAccounts", ParentType, ContextType, RequireFields<SubscriptionrealEstateAccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type UserShareResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UserShare'] = ResolversParentTypes['UserShare']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  committedFunds?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  share?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  claimed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  iro?: Resolver<ResolversTypes['IRO'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Balance?: BalanceResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  IRO?: IROResolvers<ContextType>;
  IROSet?: IROSetResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RealEstateAccount?: RealEstateAccountResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  UserShare?: UserShareResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = HorizonRealEstateTestTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/horizon-real-estate-test/introspectionSchema":
      return import("./sources/horizon-real-estate-test/introspectionSchema") as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const horizonRealEstateTestTransforms = [];
const additionalTypeDefs = [] as any[];
const horizonRealEstateTestHandler = new GraphqlHandler({
              name: "horizon-real-estate-test",
              config: {"endpoint":"https://api.studio.thegraph.com/query/39814/horizon-real-estate-test/v0.0.1"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("horizon-real-estate-test"),
              logger: logger.child("horizon-real-estate-test"),
              importFn,
            });
sources[0] = {
          name: 'horizon-real-estate-test',
          handler: horizonRealEstateTestHandler,
          transforms: horizonRealEstateTestTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: GetIroDocument,
        get rawSDL() {
          return printWithCache(GetIroDocument);
        },
        location: 'GetIroDocument.graphql'
      },{
        document: GetIrosDocument,
        get rawSDL() {
          return printWithCache(GetIrosDocument);
        },
        location: 'GetIrosDocument.graphql'
      },{
        document: GetRealEstateAccountDocument,
        get rawSDL() {
          return printWithCache(GetRealEstateAccountDocument);
        },
        location: 'GetRealEstateAccountDocument.graphql'
      },{
        document: GetUserSharesDocument,
        get rawSDL() {
          return printWithCache(GetUserSharesDocument);
        },
        location: 'GetUserSharesDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler(): MeshHTTPHandler<MeshContext> {
  return createMeshHTTPHandler<MeshContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type getIroQueryVariables = Exact<{
  iroId: Scalars['BigInt'];
}>;


export type getIroQuery = { iros: Array<(
    Pick<IRO, 'iroId' | 'status' | 'unitPrice' | 'currency' | 'currencyDecimals' | 'softCap' | 'hardCap' | 'start' | 'end' | 'totalFunding' | 'fundsWithdrawn' | 'ownerClaimed' | 'reservesFee' | 'treasuryFee' | 'listingOwner' | 'listingOwnerShare'>
    & { shares?: Maybe<Array<Pick<UserShare, 'address' | 'committedFunds' | 'amount' | 'share' | 'claimed'>>> }
  )> };

export type getIrosQueryVariables = Exact<{
  iroIds?: InputMaybe<Array<Scalars['BigInt']> | Scalars['BigInt']>;
}>;


export type getIrosQuery = { iros: Array<Pick<IRO, 'iroId' | 'status' | 'unitPrice' | 'currency' | 'currencyDecimals' | 'softCap' | 'hardCap' | 'start' | 'end' | 'totalFunding'>> };

export type getRealEstateAccountQueryVariables = Exact<{
  account: Scalars['Bytes'];
}>;


export type getRealEstateAccountQuery = { realEstateAccounts: Array<(
    Pick<RealEstateAccount, 'address'>
    & { balances?: Maybe<Array<Pick<Balance, 'tokenId' | 'amount'>>> }
  )> };

export type getUserSharesQueryVariables = Exact<{
  user: Scalars['Bytes'];
}>;


export type getUserSharesQuery = { userShares: Array<(
    Pick<UserShare, 'address' | 'committedFunds' | 'amount' | 'share' | 'claimed'>
    & { iro: Pick<IRO, 'iroId' | 'status' | 'unitPrice' | 'currency' | 'currencyDecimals' | 'softCap' | 'hardCap' | 'start' | 'end' | 'totalFunding'> }
  )> };


export const getIroDocument = gql`
    query getIro($iroId: BigInt!) {
  iros(where: {iroId: $iroId}) {
    iroId
    status
    unitPrice
    currency
    currencyDecimals
    softCap
    hardCap
    start
    end
    totalFunding
    fundsWithdrawn
    ownerClaimed
    reservesFee
    treasuryFee
    listingOwner
    listingOwnerShare
    shares {
      address
      committedFunds
      amount
      share
      claimed
    }
  }
}
    ` as unknown as DocumentNode<getIroQuery, getIroQueryVariables>;
export const getIrosDocument = gql`
    query getIros($iroIds: [BigInt!]) {
  iros(where: {iroId_in: $iroIds}) {
    iroId
    status
    unitPrice
    currency
    currencyDecimals
    softCap
    hardCap
    start
    end
    totalFunding
  }
}
    ` as unknown as DocumentNode<getIrosQuery, getIrosQueryVariables>;
export const getRealEstateAccountDocument = gql`
    query getRealEstateAccount($account: Bytes!) {
  realEstateAccounts(where: {address: $account}) {
    address
    balances {
      tokenId
      amount
    }
  }
}
    ` as unknown as DocumentNode<getRealEstateAccountQuery, getRealEstateAccountQueryVariables>;
export const getUserSharesDocument = gql`
    query getUserShares($user: Bytes!) {
  userShares(where: {address: $user}) {
    address
    committedFunds
    amount
    share
    claimed
    iro {
      iroId
      status
      unitPrice
      currency
      currencyDecimals
      softCap
      hardCap
      start
      end
      totalFunding
    }
  }
}
    ` as unknown as DocumentNode<getUserSharesQuery, getUserSharesQueryVariables>;





export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    getIro(variables: getIroQueryVariables, options?: C): Promise<getIroQuery> {
      return requester<getIroQuery, getIroQueryVariables>(getIroDocument, variables, options) as Promise<getIroQuery>;
    },
    getIros(variables?: getIrosQueryVariables, options?: C): Promise<getIrosQuery> {
      return requester<getIrosQuery, getIrosQueryVariables>(getIrosDocument, variables, options) as Promise<getIrosQuery>;
    },
    getRealEstateAccount(variables: getRealEstateAccountQueryVariables, options?: C): Promise<getRealEstateAccountQuery> {
      return requester<getRealEstateAccountQuery, getRealEstateAccountQueryVariables>(getRealEstateAccountDocument, variables, options) as Promise<getRealEstateAccountQuery>;
    },
    getUserShares(variables: getUserSharesQueryVariables, options?: C): Promise<getUserSharesQuery> {
      return requester<getUserSharesQuery, getUserSharesQueryVariables>(getUserSharesDocument, variables, options) as Promise<getUserSharesQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;