import React from 'react';
import { Header, Footer } from './components';
import Navigation from './navigation';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation />
        <Footer />
      </div>
    )
  }
}
export default App;
