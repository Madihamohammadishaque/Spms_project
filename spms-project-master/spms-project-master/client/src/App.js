import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './views/Dashboard'
import SignInForm from './views/SignInForm';
import axios from 'axios';
import Auth from './Auth';
import PrivateRoute from './PrivateRoute';

let account = {
  accountType: '',
  accountID: ''
}

class SignIn extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      accountType: '',
      accountID: '',
      password: '',
      redirectToReferrer: false,
      successMessage: 'Enter your username and password to login.'
    };

    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleSignInChange = this.handleSignInChange.bind(this);
  }

  handleSignInChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSignInSubmit (event) {
    this.login(this.state.accountType, this.state.accountID, this.state.password)
  }

  login = async (accountType, accountID, password) => {
    console.log()
    const response = await axios.post (
      '/login',
      { accountType: accountType, accountID: accountID, password: password },
      { headers: { 'Content-Type': 'application/json' } }
    )
    console.log(response);
    this.setState({
      successMessage: response.data.success
    });
    if (response.data.success === 'Login Sucessfull.') {
      Auth.authenticate();
      this.setState({
          redirectToReferrer: true
      });
      account.accountType = this.state.accountType;
      account.accountID = this.state.accountID;
    }
    else {
      Auth.signOut();
    }
  }

  render () {  
    let { from } = this.props.location.pathname || { from: {pathname: '/'}};

    if (this.state.redirectToReferrer) {
      return <Redirect to={'/dashboard?accountType=' + this.state.accountType + '&accountID=' + this.state.accountID }/>
    }

    return (
      <div className="SignInForm">
        <SignInForm
          successMessage={this.state.successMessage} 
          onHandleChange={this.handleSignInChange}
          onHandleSubmit={this.handleSignInSubmit} />
      </div>
    );
  }
}

class App extends React.Component {
  render () {
    let  a = 34;
    console.log(a);
    
    return (
      <Router>
        <div className="Dashboard">
        <header className="Dashboard-header">
        </header>

        <Switch>
          <Route path='/sign-in' component={SignIn} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Route component={SignIn} />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
