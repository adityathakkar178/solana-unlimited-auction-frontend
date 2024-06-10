import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import classes from './Form.module.css';
import style from './Button.module.css';
import {
    getAssociatedTokenAddressSync,
    createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';
import { PublicKey, SystemProgram, Keypair } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';

const StartAuction = ({ program, provider }) => {
    const [startTime, setStartTime] = useState('');
    const [startingPrice, setStratingPrice] = useState('');
    const [nftMintAddress, setNftMintAddress] = useState('');

    const startAuction = async () => {
        try {
            const mint = new PublicKey(nftMintAddress);

            const sellerTokenAccount = getAssociatedTokenAddressSync(
                mint,
                provider.wallet.publicKey
            );

            const [pdaAccount, bump] = PublicKey.findProgramAddressSync(
                [Buffer.from('sale'), mint.toBuffer()],
                program.programId
            );

            const pdaTokenAccount = getAssociatedTokenAddressSync(
                mint,
                pdaAccount,
                true
            );

            const createPdaTokenAccountIx =
                createAssociatedTokenAccountInstruction(
                    provider.wallet.publicKey,
                    pdaTokenAccount,
                    pdaAccount,
                    mint
                );

            console.log(program.methods.startAuction);
            console.log(startTime, startingPrice);
            const transactionSignature = await program.methods
                .startAuction(
                    new anchor.BN(startTime),
                    new anchor.BN(startingPrice)
                )
                .accounts({
                    seller: provider.wallet.publicKey,
                    sellerTokenAccount: sellerTokenAccount,
                    pdaAccount,
                    pdaTokenAccount,
                    mint: mint,
                    pdaSigner: pdaAccount,
                    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                })
                .preInstructions([createPdaTokenAccountIx])
                .signers([])
                .rpc({ skipPreflight: true });

            console.log('Transaction signature', transactionSignature);
        } catch (error) {
            console.log('Error starting auction', error);
        }
    };

    return (
        <Container>
            <Form className={classes.form}>
                <h2>Start Auction</h2>
                <Form.Group className="mb-3" controlId="nftMintAddress">
                    <Form.Label>NFT Mint Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter NFT mint address"
                        value={nftMintAddress}
                        onChange={(e) => setNftMintAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="startTime">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter start time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="starttingPrice">
                    <Form.Label>Starting Price</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter starting price"
                        value={startingPrice}
                        onChange={(e) => setStratingPrice(e.target.value)}
                    />
                </Form.Group>

                <Button
                    className={style.button}
                    variant="primary"
                    onClick={startAuction}
                >
                    Start Auction
                </Button>
            </Form>
        </Container>
    );
};

export default StartAuction;
