export const IDL = {
    version: '0.1.0',
    name: 'unlimited_auction',
    instructions: [
        {
            name: 'mintCollection',
            accounts: [
                {
                    name: 'payer',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'collectionMetadataAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'collectionEditionAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'collectionMintAccount',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'collectionAssociatedTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenMetadataProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'collectionName',
                    type: 'string',
                },
                {
                    name: 'collectionSymbol',
                    type: 'string',
                },
                {
                    name: 'collectionUri',
                    type: 'string',
                },
            ],
        },
        {
            name: 'mintNft',
            accounts: [
                {
                    name: 'payer',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'metadataAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'editionAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'mintAccount',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'associatedTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenMetadataProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'nftName',
                    type: 'string',
                },
                {
                    name: 'nftSymbol',
                    type: 'string',
                },
                {
                    name: 'nftUri',
                    type: 'string',
                },
                {
                    name: 'collectionAddress',
                    type: 'publicKey',
                },
            ],
        },
        {
            name: 'startAuction',
            accounts: [
                {
                    name: 'seller',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'sellerTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'pdaAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'pdaTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'mint',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'pdaSigner',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'startTime',
                    type: 'i64',
                },
                {
                    name: 'startingPrice',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'placeBid',
            accounts: [
                {
                    name: 'bidder',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'pdaAccount',
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'bidAmount',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'acceptBid',
            accounts: [
                {
                    name: 'seller',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'pdaAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'pdaTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'winningBidderTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'pdaSigner',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'winningBidder',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'mint',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'winningBidder',
                    type: 'publicKey',
                },
            ],
        },
        {
            name: 'rejectBid',
            accounts: [
                {
                    name: 'seller',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'pdaAccount',
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'bidder',
                    type: 'publicKey',
                },
            ],
        },
        {
            name: 'withdrawBid',
            accounts: [
                {
                    name: 'bidder',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'pdaAccount',
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: 'cancelAuction',
            accounts: [
                {
                    name: 'seller',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'pdaAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'pdaTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'sellerTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'pdaSigner',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'mint',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
    ],
    accounts: [
        {
            name: 'Auction',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'mint',
                        type: 'publicKey',
                    },
                    {
                        name: 'seller',
                        type: 'publicKey',
                    },
                    {
                        name: 'startTime',
                        type: 'i64',
                    },
                    {
                        name: 'startingPrice',
                        type: 'u64',
                    },
                    {
                        name: 'bids',
                        type: {
                            vec: {
                                defined: 'Bid',
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
    ],
    types: [
        {
            name: 'Bid',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bidder',
                        type: 'publicKey',
                    },
                    {
                        name: 'amount',
                        type: 'u64',
                    },
                ],
            },
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
};
