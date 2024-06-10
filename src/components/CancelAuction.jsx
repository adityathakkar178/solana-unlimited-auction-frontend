import { useState } from 'react';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { Button, Container, Form } from 'react-bootstrap';
import classes from './Form.module.css';
import style from './Button.module.css';

const CancelAuction = ({ program, provider }) => {
    const [nftMintAddress, setNftMintAddress] = useState('');

    const cancelAuction = async () => {
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

            const pdaTokenAccountAddress = getAssociatedTokenAddressSync(
                mint,
                pdaAccount,
                true
            );

            console.log(program.methods.cancelAuction);
            const transactionSignature = await program.methods
                .cancelAuction()
                .accounts({
                    seller: provider.wallet.publicKey,
                    pdaAccount,
                    pdaTokenAccount: pdaTokenAccountAddress,
                    sellerTokenAccount: sellerTokenAccount,
                    pdaSigner: pdaAccount,
                    mint,
                    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                })
                .signers([])
                .rpc({ skipPreflight: true });

            console.log('Transaction signature', transactionSignature);
        } catch (error) {
            console.log('Error canceling auction', error);
        }
    };

    return (
        <Container>
            <Form className={classes.form}>
                <h2>Cancel Auction</h2>
                <Form.Group className="mb-3" controlId="nftMintAddress">
                    <Form.Label>NFT Mint Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter NFT mint address"
                        value={nftMintAddress}
                        onChange={(e) => setNftMintAddress(e.target.value)}
                    />
                </Form.Group>

                <Button
                    className={style.button}
                    variant="primary"
                    onClick={cancelAuction}
                >
                    Cancel Auction
                </Button>
            </Form>
        </Container>
    );
};

export default CancelAuction;
