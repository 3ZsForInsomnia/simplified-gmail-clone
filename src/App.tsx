import React from "react";
import "./App.css";
import { MessagesTable } from './components/Table';

const currentUser = {
    name: 'Coding Test User',
    email: 'foo.bar@example.com',
    id: '1',
};

const App = () => {
    return (
        <div className="App">
            <MessagesTable currentUser={currentUser} />
        </div>
    );
}

export default App;
