import Wallet from './components/Connect';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './App.module.css';

function App() {
    return (
        <div className={classes.App}>
            <Wallet />
        </div>
    );
}

export default App;
