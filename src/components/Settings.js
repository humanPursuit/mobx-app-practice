import ListErrors from "./ListErrors";
import React from "react";
import { inject, observer } from "mobx-react";

class SettingForm extends React.Component {
  constructor() {
    super();
    this.state = {
      image: "",
      username: "",
      bio: "",
      email: "",
      password: ""
    };

    this.updateState = field => ev => {
      const state = this.state;
      this.setState({ ...state, [field]: ev.target.value });
    };

    this.submitForm = ev => {
      ev.preventDefault();
      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }

      this.props.onSubmitForm(user);
    };
  }

  componentWillMount() {
    if (this.props.userStore.currentUser) {
      this.setState({
        image: this.props.userStore.currentUser.image || "",
        username: this.props.userStore.currentUser.name,
        bio: this.props.userStore.currentUser.bio || "",
        email: this.props.userStore.currentUser.email
      });
    }
  }

  render() {
    return (
      <form onSubmit={() => {}}>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            value={this.state.image}
            onChange={this.updateState("image")}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="UserName"
            value={this.state.username}
            onChange={this.updateState("username")}
          />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            row="8"
            placeholder="short bio"
            value={this.state.bio}
            onChange={this.updateState("bio")}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.updateState("email")}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="new password"
            value={this.state.password}
            onChange={this.updateState("password")}
          />
        </fieldset>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={this.props.userStore.updatingUser}
        >
          Update Settings
        </button>
      </form>
    );
  }
}

@inject("userStore", "authStore")
@observer
export default class Settings extends React.Component {
  handleClickLogout = () => {
    this.props.authStore.logout().then(() => {
      this.props.history.replace("/");
    });
  };

  render() {
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">{"Your Settings"}</h1>

              <ListErrors errors={this.props.userStore.updatingErrors} />

              <SettingForm
                currentUser={this.props.userStore.currentUser}
                onSubmit={user => this.props.userStore.updateUser(user)}
              />

              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={this.handleClickLogout}
              >
                Or click here to logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
