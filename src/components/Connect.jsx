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
import MintNFT from './Mint';

require('@solana/wallet-adapter-react-ui/styles.css');

const ProgramContext = createContext(null);

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

    const connectToProgram = async () => {
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
        setProvider(provider);
        // console.log(programID);
        const program = new anchor.Program(
            IDL,
            new PublicKey('E2BkzeYcufY1HRNLEAuFA27gTxsx7bvw4YoCNxvduzDd'),
            provider
        );
        // console.log(program);
        // console.log('provider', provider.wallet);
        setProgram(program);
        // try {
        //     const collectionMintAccount = Keypair.generate();

        //     const [collectionMetadataAccount, metadataBump] =
        //         PublicKey.findProgramAddressSync(
        //             [
        //                 Buffer.from('metadata'),
        //                 new PublicKey(
        //                     'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
        //                 ).toBuffer(),
        //                 collectionMintAccount.publicKey.toBuffer(),
        //             ],
        //             new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
        //         );

        //     const [collectionEditionAccount, editionBump] =
        //         PublicKey.findProgramAddressSync(
        //             [
        //                 Buffer.from('metadata'),
        //                 new PublicKey(
        //                     'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
        //                 ).toBuffer(),
        //                 collectionMintAccount.publicKey.toBuffer(),
        //                 Buffer.from('edition'),
        //             ],
        //             new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
        //         );

        //     const collectionAssociatedTokenAccount =
        //         getAssociatedTokenAddressSync(
        //             collectionMintAccount.publicKey,
        //             provider.wallet.publicKey
        //         );

        //     console.log(program.methods.mintCollection);
        //     console.log(collectionName, collectionSymbol, collectionURI);
        //     const transactionSignature = await program.methods
        //         .mintCollection(collectionName, collectionSymbol, collectionURI)
        //         .accounts({
        //             payer: provider.wallet.publicKey,
        //             collectionMetadataAccount,
        //             collectionEditionAccount,
        //             collectionMintAccount: collectionMintAccount.publicKey,
        //             collectionAssociatedTokenAccount,
        //             tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        //             tokenMetadataProgram: new PublicKey(
        //                 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
        //             ),
        //             associatedTokenProgram: new PublicKey(
        //                 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        //             ),
        //             systemProgram: SystemProgram.programId,
        //             rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        //         })
        //         .signers([collectionMintAccount])
        //         .rpc({ skipPreflight: true });

        //     console.log('Transaction signature', transactionSignature);
        // } catch (error) {
        //     console.error('Error minting collection:', error);
        // }
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
            <Form>
                <Button variant="primary" onClick={connectToProgram}>
                    Connect to program
                </Button>
            </Form>

            {connected && program && <MintCollection program={program} provider={provider} />}
            {connected && program && <MintNFT program={program} provider={provider} />}
        </>
    );
};

export default Wallet;
