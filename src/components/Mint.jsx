import { useState } from 'react';
import { PublicKey, SystemProgram, Keypair } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { Button, Form, Container } from 'react-bootstrap';
import classes from './Form.module.css';
import style from './Button.module.css';

const MintNFT = ({ program, provider }) => {
    const [nftName, setNftName] = useState('');
    const [nftSymbol, setNftSymbol] = useState('');
    const [nftURI, setNftURI] = useState('');
    const [collectionAddress, setCollectionAddress] = useState('');

    const mintNft = async () => {
        try {
            const mintAccount = Keypair.generate();
            console.log(mintAccount.publicKey.toString());

            const collectionAddressPubkey = new PublicKey(collectionAddress);

            const [metadataAccount, metadataBump] =
                PublicKey.findProgramAddressSync(
                    [
                        Buffer.from('metadata'),
                        new PublicKey(
                            'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
                        ).toBuffer(),
                        mintAccount.publicKey.toBuffer(),
                    ],
                    new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
                );

            const [editionAccount, editionBump] =
                PublicKey.findProgramAddressSync(
                    [
                        Buffer.from('metadata'),
                        new PublicKey(
                            'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
                        ).toBuffer(),
                        mintAccount.publicKey.toBuffer(),
                        Buffer.from('edition'),
                    ],
                    new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
                );

            const associatedTokenAccount = getAssociatedTokenAddressSync(
                mintAccount.publicKey,
                provider.wallet.publicKey
            );

            console.log(program.methods.mintCollection);
            console.log(nftName, nftSymbol, nftURI, collectionAddressPubkey);
            const transactionSignature = await program.methods
                .mintNft(nftName, nftSymbol, nftURI, collectionAddressPubkey)
                .accounts({
                    payer: provider.wallet.publicKey,
                    metadataAccount: metadataAccount,
                    editionAccount: editionAccount,
                    mintAccount: mintAccount.publicKey,
                    associatedTokenAccount: associatedTokenAccount,
                    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                    tokenMetadataProgram: new PublicKey(
                        'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
                    ),
                    associatedTokenProgram: new PublicKey(
                        'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
                    ),
                    systemProgram: SystemProgram.programId,
                    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                })
                .signers([mintAccount])
                .rpc({ skipPreflight: true })
                .then()
                .catch((error) => console.error(error));

            console.log('Transaction signature', transactionSignature);
        } catch (error) {
            console.error('Error minting collection:', error);
        }
    };

    return (
        <Container>
            <Form className={classes.form}>
                <h2>Mint NFT</h2>
                <Form.Group className="mb-3" controlId="collectionName">
                    <Form.Label>Nft Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter collection name"
                        value={nftName}
                        onChange={(e) => setNftName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="collectionSymbol">
                    <Form.Label>Nft Symbol</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter collection symbol"
                        value={nftSymbol}
                        onChange={(e) => setNftSymbol(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="collectionURI">
                    <Form.Label>Nft URI</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter collection URI"
                        value={nftURI}
                        onChange={(e) => setNftURI(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="collectionAddress">
                    <Form.Label>Collection Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter collection Address"
                        value={collectionAddress}
                        onChange={(e) => setCollectionAddress(e.target.value)}
                    />
                </Form.Group>

                <Button
                    className={style.button}
                    variant="primary"
                    onClick={mintNft}
                >
                    Mint NFT
                </Button>
            </Form>
        </Container>
    );
};

export default MintNFT;
