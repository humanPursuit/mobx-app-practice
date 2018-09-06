import { Link } from "react-router-dom";
import ListErrors from "./ListErrors";
import React from "react";
import { inject, observer } from "mobx-react";

@inject("authStore")
@observer
export default class Register extends React.Component {
  componentWillMount() {
    this.props.authStore.reset();
  }

  handleUsernameChange = e => this.props.authStore.setUserName(e.target.value);
  handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.authStore.register().then(() => this.props.history.replace("/"));
  };

  render() {
    const { values, errors, inProgress } = this.props.authStore;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an Account?</Link>
              </p>

              <ListErrors errors={errors} />
              
              <form onSubmit={this.handleFormSubmit}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder={"Username"}
                    value={values.username}
                    onChange={this.handleUsernameChange}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder={"Email"}
                    value={values.email}
                    onChange={this.handleEmailChange}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder={"Password"}
                    value={values.password}
                    onChange={this.handlePasswordChange}
                  />
                </fieldset>

                <button
                  type="button"
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={inProgress}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
