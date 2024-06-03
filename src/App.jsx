import Wallet from './components/Connect';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './App.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import Auction from './components/Auction';

function App() {
    return (
        <>
            <div className={classes.App}>
                <Wallet />
                {/* <Auction /> */}
            </div>
        </>
    );
}

export default App;
