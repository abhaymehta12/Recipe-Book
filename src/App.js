import React from 'react';
import { Header } from './components';
import Navigation from './navigation';
import { connect } from 'react-redux';
import { AuthProvider } from './context/auth';
import './styles';

class App extends React.Component {
  render() {
    return (
      <div>
        <AuthProvider>
          <Header />
          <Navigation />
        </AuthProvider>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(App);