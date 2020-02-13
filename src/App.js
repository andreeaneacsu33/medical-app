import React, {Component} from 'react';
import {Grommet} from 'grommet';
import {grommet} from "grommet/themes";
import {Provider} from 'react-redux';
import store from "./store";
import Navigation from './components/navigation/Navigation';


class App extends Component {

    render() {
        return (
            <Grommet full theme={grommet}>
                <Provider store={store}>
                    <div className="App">
                        <Navigation/>
                    </div>
                </Provider>
            </Grommet>
        );
    }
}

export default App;
