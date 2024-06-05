import { createContext, useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, SystemProgram, Keypair } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import {
    WalletMultiButton,
    WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';
import { IDL } from '../idl';
import { Container, ButtonGroup, Button, Form } from 'react-bootstrap';
import MintCollection from './Collection';

require('@solana/wallet-adapter-react-ui/styles.css');

const ProgramContext = createContext(null);

const programID = new PublicKey(IDL.metadata.address);
const network = 'https://api.devnet.solana.com/';
const opts = { preflightCommitment: 'processed' };

const Wallet = () => {
    const wallet = useAnchorWallet();
    const { connected } = useWallet();
    console.log(connected);
    const [provider, setProvider] = useState(null);
    const [program, setProgram] = useState(null);
    const [collectionName, setCollectionName] = useState('');
    const [collectionSymbol, setCollectionSymbol] = useState('');
    const [collectionURI, setCollectionURI] = useState('');
    const [error, setError] = useState('');

    const getProvider = () => {
        if (!wallet) return null;
        const connection = new Connection(network, opts.preflightCommitment);
        return new anchor.AnchorProvider(
            connection,
            wallet,
            opts.preflightCommitment
        );
    };

    // setProvider(getProvider);

    const mintCollection = async () => {
        setError('');
        if (!connected) {
            setError('Wallet is not connected.');
            return;
        }
        const provider = getProvider();
        if (!provider) {
            setError('Provider is not available.');
            return;
        }
        // console.log(programID);
        const program = new anchor.Program(IDL, programID, provider);
        console.log(program);
        console.log('provider', provider.wallet);
        setProgram(program);
        try {
            const collectionMintAccount = Keypair.generate();
            console.log('mint', collectionMintAccount);

            const collectionAssociatedTokenAccount =
                getAssociatedTokenAddressSync(
                    provider.wallet.publicKey,
                    collectionMintAccount.publicKey
                );

            console.log(program.methods.mintCollection);
            console.log(collectionName, collectionSymbol, collectionURI);
            // const collectionTransactionSignature = await program.methods
            //     .mintCollection(collectionName, collectionSymbol, collectionURI)
            //     .accounts({
            //         payer: provider.wallet.publicKey,
            //         collectionMintAccount: collectionMintAccount.publicKey,
            //         collectionAssociatedTokenAccount:
            //             collectionAssociatedTokenAccount,
            //     })
            //     .signers([collectionMintAccount])
            //     .rpc({ skipPreflight: true }).then().catch((error)=> console.log("error", error));
            const col = await program.instruction
                .mintCollection(collectionName, collectionSymbol, collectionURI)
                .accounts({
                    payer: provider.wallet.publicKey,
                    collectionMintAccount: collectionMintAccount.publicKey,
                    collectionAssociatedTokenAccount:
                        collectionAssociatedTokenAccount,
                })
                .signers([collectionMintAccount])
                .rpc({ skipPreflight: true })
                .then()
                .catch((error) => console.log('error', error));
            console.log(
                'Transaction signature',
                // collectionTransactionSignature
                col
            );
        } catch (error) {
            console.error('Error minting collection:', error);
        }
    };

    return (
        <>
            <Container className="d-flex justify-content-center my-3">
                <ButtonGroup>
                    <div className="me-2">
                        <WalletMultiButton />
                    </div>
                    <div>
                        <WalletDisconnectButton />
                    </div>
                </ButtonGroup>
            </Container>
            {/* <MintCollection program={program} /> */}
            <h2>Mint Collection</h2>
            <Form>
                <Form.Group controlId="collectionName">
                    <Form.Label>Collection Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter collection name"
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="collectionSymbol">
                    <Form.Label>Collection Symbol</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter collection symbol"
                        value={collectionSymbol}
                        onChange={(e) => setCollectionSymbol(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="collectionURI">
                    <Form.Label>Collection URI</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter collection URI"
                        value={collectionURI}
                        onChange={(e) => setCollectionURI(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" onClick={mintCollection}>
                    Mint Collection
                </Button>
            </Form>

            {/* {collectionAddress && (
                <div>
                    <h3>Collection Minted!</h3>
                    <p>Collection Address: {collectionAddress}</p>
                </div>
            )} */}
        </>
    );
};

export default Wallet;
