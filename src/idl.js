export const IDL = {
    metadata: {
        name: 'unlimited_auction',
        version: '0.1.0',
        spec: '0.1.0',
        description: 'Created with Anchor',
        address: '7pWdQGjfPAaQbf8nqaErVSBHvWS6MtUisqwu3iWJ2EKc',
    },
    instructions: [
        {
            name: 'accept_bid',
            discriminator: [196, 191, 1, 229, 144, 172, 122, 227],
            accounts: [
                {
                    name: 'seller',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'pda_account',
                    writable: true,
                },
                {
                    name: 'pda_token_account',
                    writable: true,
                },
                {
                    name: 'winning_bidder_token_account',
                    writable: true,
                },
                {
                    name: 'pda_signer',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [115, 97, 108, 101],
                            },
                            {
                                kind: 'account',
                                path: 'mint',
                            },
                        ],
                    },
                },
                {
                    name: 'winning_bidder',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'mint',
                    writable: true,
                },
                {
                    name: 'token_program',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'rent',
                    address: 'SysvarRent111111111111111111111111111111111',
                },
            ],
            args: [
                {
                    name: 'winning_bidder',
                    type: 'pubkey',
                },
            ],
        },
        {
            name: 'cancel_auction',
            discriminator: [156, 43, 197, 110, 218, 105, 143, 182],
            accounts: [
                {
                    name: 'seller',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'pda_account',
                    writable: true,
                },
                {
                    name: 'pda_token_account',
                    writable: true,
                },
                {
                    name: 'seller_token_account',
                    writable: true,
                },
                {
                    name: 'pda_signer',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [115, 97, 108, 101],
                            },
                            {
                                kind: 'account',
                                path: 'mint',
                            },
                        ],
                    },
                },
                {
                    name: 'mint',
                    writable: true,
                },
                {
                    name: 'token_program',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'rent',
                    address: 'SysvarRent111111111111111111111111111111111',
                },
            ],
            args: [],
        },
        {
            name: 'mint_collection',
            discriminator: [137, 138, 109, 239, 203, 207, 225, 67],
            accounts: [
                {
                    name: 'payer',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'collection_metadata_account',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [109, 101, 116, 97, 100, 97, 116, 97],
                            },
                            {
                                kind: 'account',
                                path: 'token_metadata_program',
                            },
                            {
                                kind: 'account',
                                path: 'collection_mint_account',
                            },
                        ],
                        program: {
                            kind: 'account',
                            path: 'token_metadata_program',
                        },
                    },
                },
                {
                    name: 'collection_edition_account',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [109, 101, 116, 97, 100, 97, 116, 97],
                            },
                            {
                                kind: 'account',
                                path: 'token_metadata_program',
                            },
                            {
                                kind: 'account',
                                path: 'collection_mint_account',
                            },
                            {
                                kind: 'const',
                                value: [101, 100, 105, 116, 105, 111, 110],
                            },
                        ],
                        program: {
                            kind: 'account',
                            path: 'token_metadata_program',
                        },
                    },
                },
                {
                    name: 'collection_mint_account',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'collection_associated_token_account',
                    writable: true,
                },
                {
                    name: 'token_program',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'token_metadata_program',
                    address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
                },
                {
                    name: 'associated_token_program',
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'rent',
                    address: 'SysvarRent111111111111111111111111111111111',
                },
            ],
            args: [
                {
                    name: 'collection_name',
                    type: 'string',
                },
                {
                    name: 'collection_symbol',
                    type: 'string',
                },
                {
                    name: 'collection_uri',
                    type: 'string',
                },
            ],
        },
        {
            name: 'mint_nft',
            discriminator: [211, 57, 6, 167, 15, 219, 35, 251],
            accounts: [
                {
                    name: 'payer',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'metadata_account',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [109, 101, 116, 97, 100, 97, 116, 97],
                            },
                            {
                                kind: 'account',
                                path: 'token_metadata_program',
                            },
                            {
                                kind: 'account',
                                path: 'mint_account',
                            },
                        ],
                        program: {
                            kind: 'account',
                            path: 'token_metadata_program',
                        },
                    },
                },
                {
                    name: 'edition_account',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [109, 101, 116, 97, 100, 97, 116, 97],
                            },
                            {
                                kind: 'account',
                                path: 'token_metadata_program',
                            },
                            {
                                kind: 'account',
                                path: 'mint_account',
                            },
                            {
                                kind: 'const',
                                value: [101, 100, 105, 116, 105, 111, 110],
                            },
                        ],
                        program: {
                            kind: 'account',
                            path: 'token_metadata_program',
                        },
                    },
                },
                {
                    name: 'mint_account',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'associated_token_account',
                    writable: true,
                },
                {
                    name: 'token_program',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'token_metadata_program',
                    address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
                },
                {
                    name: 'associated_token_program',
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'rent',
                    address: 'SysvarRent111111111111111111111111111111111',
                },
            ],
            args: [
                {
                    name: 'nft_name',
                    type: 'string',
                },
                {
                    name: 'nft_symbol',
                    type: 'string',
                },
                {
                    name: 'nft_uri',
                    type: 'string',
                },
                {
                    name: 'collection_address',
                    type: 'pubkey',
                },
            ],
        },
        {
            name: 'place_bid',
            discriminator: [238, 77, 148, 91, 200, 151, 92, 146],
            accounts: [
                {
                    name: 'bidder',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'pda_account',
                    writable: true,
                },
            ],
            args: [
                {
                    name: 'bid_amount',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'reject_bid',
            discriminator: [16, 180, 239, 231, 62, 80, 45, 40],
            accounts: [
                {
                    name: 'seller',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'pda_account',
                    writable: true,
                },
            ],
            args: [
                {
                    name: 'bidder',
                    type: 'pubkey',
                },
            ],
        },
        {
            name: 'start_auction',
            discriminator: [255, 2, 149, 136, 148, 125, 65, 195],
            accounts: [
                {
                    name: 'seller',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'seller_token_account',
                    writable: true,
                },
                {
                    name: 'pda_account',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [115, 97, 108, 101],
                            },
                            {
                                kind: 'account',
                                path: 'mint',
                            },
                        ],
                    },
                },
                {
                    name: 'pda_token_account',
                    writable: true,
                },
                {
                    name: 'mint',
                    writable: true,
                },
                {
                    name: 'pda_signer',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [115, 97, 108, 101],
                            },
                            {
                                kind: 'account',
                                path: 'mint',
                            },
                        ],
                    },
                },
                {
                    name: 'associated_token_program',
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
                },
                {
                    name: 'token_program',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'rent',
                    address: 'SysvarRent111111111111111111111111111111111',
                },
            ],
            args: [
                {
                    name: 'start_time',
                    type: 'i64',
                },
                {
                    name: 'starting_price',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'withdraw_bid',
            discriminator: [110, 53, 157, 195, 147, 100, 110, 73],
            accounts: [
                {
                    name: 'bidder',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'pda_account',
                    writable: true,
                },
            ],
            args: [],
        },
    ],
    accounts: [
        {
            name: 'Auction',
            discriminator: [218, 94, 247, 242, 126, 233, 131, 81],
        },
    ],
    errors: [
        {
            code: 6000,
            name: 'AuctionNotStarted',
            msg: 'Auction has not started yet.',
        },
        {
            code: 6001,
            name: 'AuctionEnded',
            msg: 'Auction has already ended.',
        },
        {
            code: 6002,
            name: 'AuctionNotEnded',
            msg: 'Auction has not ended yet.',
        },
        {
            code: 6003,
            name: 'BidsPlaced',
            msg: 'Cannot cancel auction because bids have been placed.',
        },
        {
            code: 6004,
            name: 'BidNotFound',
            msg: 'Bid not found.',
        },
    ],
    types: [
        {
            name: 'Auction',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'mint',
                        type: 'pubkey',
                    },
                    {
                        name: 'seller',
                        type: 'pubkey',
                    },
                    {
                        name: 'start_time',
                        type: 'i64',
                    },
                    {
                        name: 'starting_price',
                        type: 'u64',
                    },
                    {
                        name: 'bids',
                        type: {
                            vec: {
                                defined: {
                                    name: 'Bid',
                                },
                            },
                        },
                    },
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                ],
            },
        },
        {
            name: 'Bid',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bidder',
                        type: 'pubkey',
                    },
                    {
                        name: 'amount',
                        type: 'u64',
                    },
                ],
            },
        },
    ],
};
