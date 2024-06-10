import { PublicKey } from '@solana/web3.js';
import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import classes from './Form.module.css';
import style from './Button.module.css';

const RejectBid = ({ program, provider }) => {
    const [bidder, setBidder] = useState('');
    const [nftMintAddress, setNftMintAddress] = useState('');

    const rejectBid = async () => {
        try {
            const mint = new PublicKey(nftMintAddress);
            const bid = new PublicKey(bidder);

            const [pdaAccount, bump] = PublicKey.findProgramAddressSync(
                [Buffer.from('sale'), mint.toBuffer()],
                program.programId
            );

            console.log(program.methods.rejectBid);
            console.log(bidder);
            const transactionSignature = await program.methods
                .rejectBid(bid)
                .accounts({
                    seller: provider.wallet.publicKey,
                    pdaAccount,
                })
                .signers([])
                .rpc({ skipPreflight: true });

            console.log('Transaction signature', transactionSignature);
        } catch (error) {
            console.log('Error rejecting bid', error);
        }
    };

    return (
        <Container>
            <Form className={classes.form}>
                <h2>Reject Bid</h2>
                <Form.Group className="mb-3" controlId="nftMintAddress">
                    <Form.Label>NFT Mint Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter NFT mint address"
                        value={nftMintAddress}
                        onChange={(e) => setNftMintAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="bidder">
                    <Form.Label>Bidder</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter bidder"
                        value={bidder}
                        onChange={(e) => setBidder(e.target.value)}
                    />
                </Form.Group>

                <Button
                    className={style.button}
                    variant="primary"
                    onClick={rejectBid}
                >
                    Reject Bid
                </Button>
            </Form>
        </Container>
    );
};

export default RejectBid;
