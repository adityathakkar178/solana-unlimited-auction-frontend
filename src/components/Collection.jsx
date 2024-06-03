// import { useState } from 'react';
// import { PublicKey, SystemProgram } from '@solana/web3.js';
// import * as anchor from '@project-serum/anchor';
// import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
// import { Button, Form, Container } from 'react-bootstrap';

// const MintCollection = ({ program }) => {
//     const [collectionName, setCollectionName] = useState('');
//     const [collectionSymbol, setCollectionSymbol] = useState('');
//     const [collectionURI, setCollectionURI] = useState('');
//     const [collectionAddress, setCollectionAddress] = useState('');

//     const mintCollection = async () => {
//         // if (!program || !provider) {
//         //     console.error("Program or provider is not initialized");
//         //     return;
//         // }

//         try {
//             const collectionMintAccount = anchor.web3.Keypair.generate();
//             const collectionMetadataAccount = await PublicKey.findProgramAddress(
//                 [
//                     Buffer.from('metadata'),
//                     collectionMintAccount.publicKey.toBuffer()
//                 ],
//                 program.programId
//             );
//             const collectionEditionAccount = await PublicKey.findProgramAddress(
//                 [
//                     Buffer.from('metadata'),
//                     collectionMintAccount.publicKey.toBuffer(),
//                     Buffer.from('edition')
//                 ],
//                 program.programId
//             );
//             const collectionAssociatedTokenAccount = await PublicKey.findProgramAddress(
//                 [
//                     provider.wallet.publicKey.toBuffer(),
//                     collectionMintAccount.publicKey.toBuffer()
//                 ],
//                 program.programId
//             );

//             await program.rpc.mintCollection(
//                 collectionName,
//                 collectionSymbol,
//                 collectionURI, 
//                 {
//                     accounts: {
//                         payer: provider.wallet.publicKey,
//                         collectionMintAccount: collectionMintAccount.publicKey,
//                         collectionAssociatedTokenAccount: collectionAssociatedTokenAccount[0],
//                     },
//                     signers: [collectionMintAccount],
//                 }
//             );

//             setCollectionAddress(collectionMintAccount.publicKey.toString());
//         } catch (error) {
//             console.error("Error minting collection:", error);
//         }
//     };

//     return (
//         <Container>
//             <h2>Mint Collection</h2>
//             <Form>
//                 <Form.Group controlId="collectionName">
//                     <Form.Label>Collection Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="Enter collection name"
//                         value={collectionName}
//                         onChange={(e) => setCollectionName(e.target.value)}
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="collectionSymbol">
//                     <Form.Label>Collection Symbol</Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="Enter collection symbol"
//                         value={collectionSymbol}
//                         onChange={(e) => setCollectionSymbol(e.target.value)}
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="collectionURI">
//                     <Form.Label>Collection URI</Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="Enter collection URI"
//                         value={collectionURI}
//                         onChange={(e) => setCollectionURI(e.target.value)}
//                     />
//                 </Form.Group>

//                 <Button variant="primary" onClick={mintCollection}>
//                     Mint Collection
//                 </Button>
//             </Form>

//             {collectionAddress && (
//                 <div>
//                     <h3>Collection Minted!</h3>
//                     <p>Collection Address: {collectionAddress}</p>
//                 </div>
//             )}
//         </Container>
//     );
// };

// export default MintCollection;
