import { useState } from 'react';
import { Connection, PublicKey, SystemProgram, Keypair } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { Button, Form, Container } from 'react-bootstrap';
import classes from './Form.module.css';
import style from './Button.module.css';

const MintCollection = ({ program, provider }) => {
    const [collectionName, setCollectionName] = useState('');
    const [collectionSymbol, setCollectionSymbol] = useState('');
    const [collectionURI, setCollectionURI] = useState('');

    const mintCollection = async () => {
        try {
            const collectionMintAccount = Keypair.generate();

            console.log(collectionMintAccount.publicKey.toString());

            const [collectionMetadataAccount, metadataBump] =
                PublicKey.findProgramAddressSync(
                    [
                        Buffer.from('metadata'),
                        new PublicKey(
                            'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
                        ).toBuffer(),
                        collectionMintAccount.publicKey.toBuffer(),
                    ],
                    new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
                );

            const [collectionEditionAccount, editionBump] =
                PublicKey.findProgramAddressSync(
                    [
                        Buffer.from('metadata'),
                        new PublicKey(
                            'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
                        ).toBuffer(),
                        collectionMintAccount.publicKey.toBuffer(),
                        Buffer.from('edition'),
                    ],
                    new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
                );

            const collectionAssociatedTokenAccount =
                getAssociatedTokenAddressSync(
                    collectionMintAccount.publicKey,
                    provider.wallet.publicKey
                );

            console.log(program.methods.mintCollection);
            console.log(collectionName, collectionSymbol, collectionURI);
            const transactionSignature = await program.methods
                .mintCollection(collectionName, collectionSymbol, collectionURI)
                .accounts({
                    payer: provider.wallet.publicKey,
                    collectionMetadataAccount,
                    collectionEditionAccount,
                    collectionMintAccount: collectionMintAccount.publicKey,
                    collectionAssociatedTokenAccount,
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
                .signers([collectionMintAccount])
                .rpc({ skipPreflight: true });

            console.log('Transaction signature', transactionSignature);
        } catch (error) {
            console.error('Error minting collection:', error);
        }
    };

    return (
        <Container>
            <Form className={classes.form}>
                <h2>Mint Collection</h2>
                <Form.Group className="mb-3" controlId="collectionName">
                    <Form.Label>Collection Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter collection name"
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="collectionSymbol">
                    <Form.Label>Collection Symbol</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter collection symbol"
                        value={collectionSymbol}
                        onChange={(e) => setCollectionSymbol(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="collectionURI">
                    <Form.Label>Collection URI</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter collection URI"
                        value={collectionURI}
                        onChange={(e) => setCollectionURI(e.target.value)}
                    />
                </Form.Group>

                <Button
                    className={style.button}
                    variant="primary"
                    onClick={mintCollection}
                >
                    Mint Collection
                </Button>
            </Form>
        </Container>
    );
};

export default MintCollection;
