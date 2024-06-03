import { createContext, useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, SystemProgram, Keypair } from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import {
    WalletMultiButton,
    WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';
import idl from '../idl.json';
import { Container, ButtonGroup } from 'react-bootstrap';
import MintCollection from './Collection';

require('@solana/wallet-adapter-react-ui/styles.css');

const ProgramContext = createContext(null);

const programID = new PublicKey(idl.metadata.address);
const network = 'https://api.devnet.solana.com/';
const opts = { preflightCommitment: 'processed' };

const Wallet = () => {
    const wallet = useAnchorWallet();
    const { connected } = useWallet();
    console.log(connected);
    const [provider, setProvider] = useState(null);
    const [program, setProgram] = useState(null);
    const [error, setError] = useState('');

    const getProvider = () => {
        if (!wallet) return null;
        const connection = new Connection(network, opts.preflightCommitment);
        return new AnchorProvider(connection, wallet, opts.preflightCommitment);
    };

    // setProvider(getProvider);

    const createConnection = async () => {
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
        const program = new Program(idl, programID, provider);
        console.log(program);
        setProgram(program)
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
        <MintCollection program={program}/>
        </>
    );
};

export default Wallet;
