import { Container, Form, Button } from 'react-bootstrap';
import { PublicKey, SystemProgram, Keypair } from '@solana/web3.js';
import classes from './Form.module.css';
import style from './Button.module.css';
import { useState } from 'react';

const WithdrawBid = ({ program, provider }) => {
    const [nftMintAddress, setNftMintAddress] = useState('');

    const withdrawBid = async () => {
        try {
            const mint = new PublicKey(nftMintAddress);

            const [pdaAccount, bump] = PublicKey.findProgramAddressSync(
                [Buffer.from('sale'), mint.toBuffer()],
                program.programId
            );

            console.log(program.methods.withdrawBid);
            const transactionSignature = await program.methods
                .withdrawBid()
                .accounts({
                    bidder: provider.wallet.publicKey,
                    pdaAccount,
                })
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
                <h2>Withdraw Bid</h2>
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
                    onClick={withdrawBid}
                >
                    Withdraw Bid
                </Button>
            </Form>
        </Container>
    );
};

export default WithdrawBid;
