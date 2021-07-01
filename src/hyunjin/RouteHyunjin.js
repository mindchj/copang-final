import Menu from "./Menu";
import {BrowserRouter, Route} from 'react-router-dom';
import Cart2 from './Cart2';
import Test from './Test';
import Test22 from './Test22';

const RouteHyunjin = () => {
    return (
        <div>
            <BrowserRouter>
                <Menu/>
                <Route path="/test" component={Test}/>
                <Route path="/cart2" component={Cart2}/>
                <Route path="/test22" component={Test22}/>
            </BrowserRouter>
        </div>
    )
}

export default RouteHyunjin;