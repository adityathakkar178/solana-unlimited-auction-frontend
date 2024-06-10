import { useState } from 'react';
import * as anchor from '@project-serum/anchor';
import {
    getAssociatedTokenAddressSync,
    createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';
import { PublicKey, SystemProgram, Keypair } from '@solana/web3.js';
import { Button, Form, Container } from 'react-bootstrap';
import classes from './Form.module.css';
import style from './Button.module.css';

const PlaceBid = ({ program, provider }) => {
    const [bidAmount, setBidAmount] = useState('');
    const [nftMintAddress, setNftMintAddress] = useState('');

    const placeBid = async () => {
        try {
            const mint = new PublicKey(nftMintAddress);

            const [pdaAccount, bump] = PublicKey.findProgramAddressSync(
                [Buffer.from('sale'), mint.toBuffer()],
                program.programId
            );

            console.log(program.methods.placeBid);
            console.log(bidAmount);
            const transactionSignature = await program.methods
                .placeBid(new anchor.BN(bidAmount))
                .accounts({
                    bidder: provider.wallet.publicKey,
                    pdaAccount,
                })
                .signers([])
                .rpc({ skipPreflight: true });

            console.log('Transaction signature', transactionSignature);
        } catch (error) {
            console.error('Error minting collection:', error);
        }
    };

    return (
        <Container>
            <Form className={classes.form}>
                <h2>Place Bid</h2>
                <Form.Group className="mb-3" controlId="nftMintAddress">
                    <Form.Label>NFT Mint Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter NFT mint address"
                        value={nftMintAddress}
                        onChange={(e) => setNftMintAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="bidAmount">
                    <Form.Label>Bidding Amount</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter bidding amount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                    />
                </Form.Group>

                <Button
                    className={style.button}
                    variant="primary"
                    onClick={placeBid}
                >
                    Place Bid
                </Button>
            </Form>
        </Container>
    );
};

export default PlaceBid;
