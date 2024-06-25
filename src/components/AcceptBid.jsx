import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import classes from './Form.module.css';
import style from './Button.module.css';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import {
    getAssociatedTokenAddressSync,
    createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';

const AcceptBid = ({ program, provider }) => {
    const [winningbidder, setWinningBidder] = useState('');
    const [nftMintAddress, setNftMintAddress] = useState('');

    const acceptBid = async () => {
        try {
            const winner = new PublicKey(winningbidder);
            const mint = new PublicKey(nftMintAddress);

            console.log('Winner:', winner.toString());

            const [pdaAccount, bump] = PublicKey.findProgramAddressSync(
                [Buffer.from('sale'), mint.toBuffer()],
                program.programId
            );

            const pdaTokenAccountAddress = getAssociatedTokenAddressSync(
                mint,
                pdaAccount,
                true
            );

            const selectedBidderTokenAccountAddress =
                getAssociatedTokenAddressSync(mint, winner);

            console.log(program.methods.acceptBid);
            console.log(winningbidder);
            const transactionSignature = await program.methods
                .acceptBid(winner)
                .accounts({
                    seller: provider.wallet.publicKey,
                    pdaAccount,
                    pdaTokenAccount: pdaTokenAccountAddress,
                    winningBidderTokenAccount:
                        selectedBidderTokenAccountAddress,
                    pdaSigner: pdaAccount,
                    winningBidder: winner,
                    mint,
                    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                })
                .signers([])
                .rpc({ skipPreflight: true });

            console.log('Transaction signature', transactionSignature);
        } catch (error) {
            console.log('Error accepting bid', error);
        }
    };

    return (
        <Container>
            <Form className={classes.form}>
                <h2>Accept Bid</h2>
                <Form.Group className="mb-3" controlId="nftMintAddress">
                    <Form.Label>NFT Mint Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter NFT mint address"
                        value={nftMintAddress}
                        onChange={(e) => setNftMintAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="winningBidder">
                    <Form.Label>Winning Bidder</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter winning bidder"
                        value={winningbidder}
                        onChange={(e) => setWinningBidder(e.target.value)}
                    />
                </Form.Group>

                <Button
                    className={style.button}
                    variant="primary"
                    onClick={acceptBid}
                >
                    Accept Bid
                </Button>
            </Form>
        </Container>
    );
};

export default AcceptBid;
