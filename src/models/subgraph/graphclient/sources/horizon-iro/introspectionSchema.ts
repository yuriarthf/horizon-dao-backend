// @ts-nocheck
import { buildASTSchema } from "graphql";

const schemaAST = {
  kind: "Document",
  definitions: [
    {
      kind: "SchemaDefinition",
      operationTypes: [
        {
          kind: "OperationTypeDefinition",
          operation: "query",
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Query",
            },
          },
        },
        {
          kind: "OperationTypeDefinition",
          operation: "subscription",
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Subscription",
            },
          },
        },
      ],
      directives: [],
    },
    {
      kind: "DirectiveDefinition",
      description: {
        kind: "StringValue",
        value:
          "Marks the GraphQL type as indexable entity.  Each type that should be an entity is required to be annotated with this directive.",
      },
      name: {
        kind: "Name",
        value: "entity",
      },
      arguments: [],
      repeatable: false,
      locations: [
        {
          kind: "Name",
          value: "OBJECT",
        },
      ],
    },
    {
      kind: "DirectiveDefinition",
      description: {
        kind: "StringValue",
        value: "Defined a Subgraph ID for an object type",
      },
      name: {
        kind: "Name",
        value: "subgraphId",
      },
      arguments: [
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id",
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "String",
              },
            },
          },
          directives: [],
        },
      ],
      repeatable: false,
      locations: [
        {
          kind: "Name",
          value: "OBJECT",
        },
      ],
    },
    {
      kind: "DirectiveDefinition",
      description: {
        kind: "StringValue",
        value:
          "creates a virtual field on the entity that may be queried but cannot be set manually through the mappings API.",
      },
      name: {
        kind: "Name",
        value: "derivedFrom",
      },
      arguments: [
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "field",
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "String",
              },
            },
          },
          directives: [],
        },
      ],
      repeatable: false,
      locations: [
        {
          kind: "Name",
          value: "FIELD_DEFINITION",
        },
      ],
    },
    {
      kind: "ScalarTypeDefinition",
      name: {
        kind: "Name",
        value: "BigDecimal",
      },
      directives: [],
    },
    {
      kind: "ScalarTypeDefinition",
      name: {
        kind: "Name",
        value: "BigInt",
      },
      directives: [],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "BlockChangedFilter",
      },
      fields: [
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "number_gte",
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Int",
              },
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "Block_height",
      },
      fields: [
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "hash",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "number",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Int",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "number_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Int",
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: "ScalarTypeDefinition",
      name: {
        kind: "Name",
        value: "Bytes",
      },
      directives: [],
    },
    {
      kind: "ObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "IRO",
      },
      fields: [
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "id",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Bytes",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "iroId",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigInt",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "status",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Status",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "listingOwner",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Bytes",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "unitPrice",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigInt",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "listingOwnerShare",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigDecimal",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "treasuryFee",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigDecimal",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "reservesFee",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigDecimal",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "currency",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Bytes",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "currencyDecimals",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigInt",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "softCap",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigInt",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "hardCap",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigInt",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "start",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigInt",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "end",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigInt",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "totalFunding",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigInt",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "shares",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "skip",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "0",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "first",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "100",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderBy",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "UserShare_orderBy",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderDirection",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "OrderDirection",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "where",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "UserShare_filter",
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "UserShare",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "fundsWithdrawn",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Boolean",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "ownerClaimed",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Boolean",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "realEstateId",
          },
          arguments: [],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: "ObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "IROSet",
      },
      fields: [
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "id",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Bytes",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "entityIds",
          },
          arguments: [],
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "iroIds",
          },
          arguments: [],
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "IROSet_filter",
      },
      fields: [
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_contains",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_not_contains",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "entityIds",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "entityIds_not",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "entityIds_contains",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "entityIds_contains_nocase",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "entityIds_not_contains",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "entityIds_not_contains_nocase",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroIds",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroIds_not",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroIds_contains",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroIds_contains_nocase",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroIds_not_contains",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroIds_not_contains_nocase",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value: "Filter for the block changed event.",
            block: true,
          },
          name: {
            kind: "Name",
            value: "_change_block",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BlockChangedFilter",
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: "EnumTypeDefinition",
      name: {
        kind: "Name",
        value: "IROSet_orderBy",
      },
      values: [
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "id",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "entityIds",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "iroIds",
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "IRO_filter",
      },
      fields: [
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_contains",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_not_contains",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroId",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroId_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroId_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroId_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroId_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroId_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroId_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "iroId_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "status",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Status",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "status_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Status",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "status_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Status",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "status_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Status",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwner",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwner_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwner_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwner_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwner_contains",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwner_not_contains",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "unitPrice",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "unitPrice_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "unitPrice_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "unitPrice_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "unitPrice_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "unitPrice_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "unitPrice_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "unitPrice_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwnerShare",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwnerShare_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwnerShare_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwnerShare_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwnerShare_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwnerShare_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwnerShare_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigDecimal",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwnerShare_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigDecimal",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "treasuryFee",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "treasuryFee_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "treasuryFee_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "treasuryFee_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "treasuryFee_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "treasuryFee_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "treasuryFee_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigDecimal",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "treasuryFee_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigDecimal",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "reservesFee",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "reservesFee_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "reservesFee_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "reservesFee_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "reservesFee_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "reservesFee_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "reservesFee_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigDecimal",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "reservesFee_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigDecimal",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currency",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currency_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currency_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currency_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currency_contains",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currency_not_contains",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currencyDecimals",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currencyDecimals_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currencyDecimals_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currencyDecimals_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currencyDecimals_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currencyDecimals_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currencyDecimals_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "currencyDecimals_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "softCap",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "softCap_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "softCap_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "softCap_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "softCap_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "softCap_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "softCap_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "softCap_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "hardCap",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "hardCap_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "hardCap_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "hardCap_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "hardCap_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "hardCap_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "hardCap_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "hardCap_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "start",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "start_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "start_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "start_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "start_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "start_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "start_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "start_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "end",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "end_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "end_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "end_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "end_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "end_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "end_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "end_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "totalFunding",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "totalFunding_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "totalFunding_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "totalFunding_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "totalFunding_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "totalFunding_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "totalFunding_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "totalFunding_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "shares",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "String",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "shares_not",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "String",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "shares_contains",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "String",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "shares_contains_nocase",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "String",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "shares_not_contains",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "String",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "shares_not_contains_nocase",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "String",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "shares_",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "UserShare_filter",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "fundsWithdrawn",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Boolean",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "fundsWithdrawn_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Boolean",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "fundsWithdrawn_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Boolean",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "fundsWithdrawn_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Boolean",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "ownerClaimed",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Boolean",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "ownerClaimed_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Boolean",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "ownerClaimed_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Boolean",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "ownerClaimed_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Boolean",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "realEstateId",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "realEstateId_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "realEstateId_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "realEstateId_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "realEstateId_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "realEstateId_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "realEstateId_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "realEstateId_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value: "Filter for the block changed event.",
            block: true,
          },
          name: {
            kind: "Name",
            value: "_change_block",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BlockChangedFilter",
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: "EnumTypeDefinition",
      name: {
        kind: "Name",
        value: "IRO_orderBy",
      },
      values: [
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "id",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "iroId",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "status",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwner",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "unitPrice",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "listingOwnerShare",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "treasuryFee",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "reservesFee",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "currency",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "currencyDecimals",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "softCap",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "hardCap",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "start",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "end",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "totalFunding",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "shares",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "fundsWithdrawn",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "ownerClaimed",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "realEstateId",
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: "EnumTypeDefinition",
      description: {
        kind: "StringValue",
        value: "Defines the order direction, either ascending or descending",
        block: true,
      },
      name: {
        kind: "Name",
        value: "OrderDirection",
      },
      values: [
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "asc",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "desc",
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: "ObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "Query",
      },
      fields: [
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "iroset",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "id",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "ID",
                  },
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value:
                  "The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value: "Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "subgraphError",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "_SubgraphErrorPolicy_",
                  },
                },
              },
              defaultValue: {
                kind: "EnumValue",
                value: "deny",
              },
              directives: [],
            },
          ],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "IROSet",
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "irosets",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "skip",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "0",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "first",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "100",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderBy",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "IROSet_orderBy",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderDirection",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "OrderDirection",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "where",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "IROSet_filter",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value:
                  "The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value: "Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "subgraphError",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "_SubgraphErrorPolicy_",
                  },
                },
              },
              defaultValue: {
                kind: "EnumValue",
                value: "deny",
              },
              directives: [],
            },
          ],
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "IROSet",
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "iro",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "id",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "ID",
                  },
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value:
                  "The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value: "Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "subgraphError",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "_SubgraphErrorPolicy_",
                  },
                },
              },
              defaultValue: {
                kind: "EnumValue",
                value: "deny",
              },
              directives: [],
            },
          ],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "IRO",
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "iros",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "skip",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "0",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "first",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "100",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderBy",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "IRO_orderBy",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderDirection",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "OrderDirection",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "where",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "IRO_filter",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value:
                  "The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value: "Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "subgraphError",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "_SubgraphErrorPolicy_",
                  },
                },
              },
              defaultValue: {
                kind: "EnumValue",
                value: "deny",
              },
              directives: [],
            },
          ],
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "IRO",
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "userShare",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "id",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "ID",
                  },
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value:
                  "The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value: "Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "subgraphError",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "_SubgraphErrorPolicy_",
                  },
                },
              },
              defaultValue: {
                kind: "EnumValue",
                value: "deny",
              },
              directives: [],
            },
          ],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "UserShare",
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "userShares",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "skip",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "0",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "first",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "100",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderBy",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "UserShare_orderBy",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderDirection",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "OrderDirection",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "where",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "UserShare_filter",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value:
                  "The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value: "Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "subgraphError",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "_SubgraphErrorPolicy_",
                  },
                },
              },
              defaultValue: {
                kind: "EnumValue",
                value: "deny",
              },
              directives: [],
            },
          ],
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "UserShare",
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "Access to subgraph metadata",
            block: true,
          },
          name: {
            kind: "Name",
            value: "_meta",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "_Meta_",
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: "EnumTypeDefinition",
      name: {
        kind: "Name",
        value: "Status",
      },
      values: [
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "PENDING",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "ONGOING",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "SUCCESS",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "FAIL",
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: "ObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "Subscription",
      },
      fields: [
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "iroset",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "id",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "ID",
                  },
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value:
                  "The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value: "Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "subgraphError",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "_SubgraphErrorPolicy_",
                  },
                },
              },
              defaultValue: {
                kind: "EnumValue",
                value: "deny",
              },
              directives: [],
            },
          ],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "IROSet",
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "irosets",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "skip",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "0",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "first",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "100",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderBy",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "IROSet_orderBy",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderDirection",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "OrderDirection",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "where",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "IROSet_filter",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value:
                  "The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value: "Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "subgraphError",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "_SubgraphErrorPolicy_",
                  },
                },
              },
              defaultValue: {
                kind: "EnumValue",
                value: "deny",
              },
              directives: [],
            },
          ],
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "IROSet",
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "iro",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "id",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "ID",
                  },
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value:
                  "The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value: "Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "subgraphError",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "_SubgraphErrorPolicy_",
                  },
                },
              },
              defaultValue: {
                kind: "EnumValue",
                value: "deny",
              },
              directives: [],
            },
          ],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "IRO",
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "iros",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "skip",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "0",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "first",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "100",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderBy",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "IRO_orderBy",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderDirection",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "OrderDirection",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "where",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "IRO_filter",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value:
                  "The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value: "Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "subgraphError",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "_SubgraphErrorPolicy_",
                  },
                },
              },
              defaultValue: {
                kind: "EnumValue",
                value: "deny",
              },
              directives: [],
            },
          ],
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "IRO",
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "userShare",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "id",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "ID",
                  },
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value:
                  "The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value: "Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "subgraphError",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "_SubgraphErrorPolicy_",
                  },
                },
              },
              defaultValue: {
                kind: "EnumValue",
                value: "deny",
              },
              directives: [],
            },
          ],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "UserShare",
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "userShares",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "skip",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "0",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "first",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                },
              },
              defaultValue: {
                kind: "IntValue",
                value: "100",
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderBy",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "UserShare_orderBy",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "orderDirection",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "OrderDirection",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "where",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "UserShare_filter",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value:
                  "The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
            {
              kind: "InputValueDefinition",
              description: {
                kind: "StringValue",
                value: "Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.",
                block: true,
              },
              name: {
                kind: "Name",
                value: "subgraphError",
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "_SubgraphErrorPolicy_",
                  },
                },
              },
              defaultValue: {
                kind: "EnumValue",
                value: "deny",
              },
              directives: [],
            },
          ],
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "UserShare",
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "Access to subgraph metadata",
            block: true,
          },
          name: {
            kind: "Name",
            value: "_meta",
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "block",
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Block_height",
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "_Meta_",
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: "ObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "UserShare",
      },
      fields: [
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "id",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Bytes",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "address",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Bytes",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "commitedFunds",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigInt",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "amount",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigInt",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "share",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "BigDecimal",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "claimed",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Boolean",
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "UserShare_filter",
      },
      fields: [
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_contains",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "id_not_contains",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "address",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "address_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "address_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "address_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Bytes",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "address_contains",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "address_not_contains",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "commitedFunds",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "commitedFunds_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "commitedFunds_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "commitedFunds_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "commitedFunds_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "commitedFunds_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "commitedFunds_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "commitedFunds_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "amount",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "amount_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "amount_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "amount_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "amount_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "amount_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigInt",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "amount_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "amount_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigInt",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "share",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "share_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "share_gt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "share_lt",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "share_gte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "share_lte",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BigDecimal",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "share_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigDecimal",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "share_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "BigDecimal",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "claimed",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Boolean",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "claimed_not",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Boolean",
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "claimed_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Boolean",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "claimed_not_in",
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Boolean",
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value: "Filter for the block changed event.",
            block: true,
          },
          name: {
            kind: "Name",
            value: "_change_block",
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "BlockChangedFilter",
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: "EnumTypeDefinition",
      name: {
        kind: "Name",
        value: "UserShare_orderBy",
      },
      values: [
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "id",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "address",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "commitedFunds",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "amount",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "share",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "claimed",
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: "ObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "_Block_",
      },
      fields: [
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "The hash of the block",
            block: true,
          },
          name: {
            kind: "Name",
            value: "hash",
          },
          arguments: [],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Bytes",
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "The block number",
            block: true,
          },
          name: {
            kind: "Name",
            value: "number",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Int",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "Integer representation of the timestamp stored in blocks for the chain",
            block: true,
          },
          name: {
            kind: "Name",
            value: "timestamp",
          },
          arguments: [],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Int",
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: "ObjectTypeDefinition",
      description: {
        kind: "StringValue",
        value: "The type for the top-level _meta field",
        block: true,
      },
      name: {
        kind: "Name",
        value: "_Meta_",
      },
      fields: [
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value:
              "Information about a specific subgraph block. The hash of the block\nwill be null if the _meta field has a block constraint that asks for\na block number. It will be filled if the _meta field has no block constraint\nand therefore asks for the latest  block\n",
            block: true,
          },
          name: {
            kind: "Name",
            value: "block",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "_Block_",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "The deployment ID",
            block: true,
          },
          name: {
            kind: "Name",
            value: "deployment",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "String",
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "If `true`, the subgraph encountered indexing errors at some past block",
            block: true,
          },
          name: {
            kind: "Name",
            value: "hasIndexingErrors",
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Boolean",
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: "EnumTypeDefinition",
      name: {
        kind: "Name",
        value: "_SubgraphErrorPolicy_",
      },
      values: [
        {
          kind: "EnumValueDefinition",
          description: {
            kind: "StringValue",
            value: "Data will be returned even if the subgraph has indexing errors",
            block: true,
          },
          name: {
            kind: "Name",
            value: "allow",
          },
          directives: [],
        },
        {
          kind: "EnumValueDefinition",
          description: {
            kind: "StringValue",
            value: "If the subgraph has indexing errors, data will be omitted. The default.",
            block: true,
          },
          name: {
            kind: "Name",
            value: "deny",
          },
          directives: [],
        },
      ],
      directives: [],
    },
  ],
};

export default buildASTSchema(schemaAST, {
  assumeValid: true,
  assumeValidSDL: true,
});
