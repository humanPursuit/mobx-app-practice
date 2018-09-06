import { withRouter, Link } from "react-router-dom";
import React from "react";
import { inject, observer } from "mobx-react";

import ListErrors from "./ListErrors";

@inject("authStore")
@withRouter
@observer
export default class Login extends React.Component {
  componentWillMount() {
    this.props.authStore.reset();
  }

  handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.authStore.login().then(() => this.props.history.replace("/"));
  };

  render() {
    const { inProgress, errors, values } = this.props.authStore;
    return (
      <div className="autho-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center"> Sign In</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
              </p>

              <ListErrors errors={errors} />

              <form onSubmit={this.handleSubmitForm}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={this.handleEmailChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={this.handlePasswordChange}
                  />
                </fieldset>

                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                  disabled={inProgress}
                >
                  SignIn
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
