import React from 'react';
import ReactDOM from 'react-dom'
import AppMain from "./App";

it('render without crashed', ()=> {
    const div = document.createElement('div');
    ReactDOM.render(<AppMain/>, div);
    ReactDOM.unmountComponentAtNode(div);
});