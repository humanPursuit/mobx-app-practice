import ListErrors from "./ListErrors";
import React from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

@inject("editorStore")
// @withRouter
@observer
export default class Editor extends React.Component {
  state = {
    tagInput: ''
  };

  componentWillMount() {
    this.props.editorStore.setArticleSlug(this.props.match.params.slug);
  }

  componentDidMount() {
    this.props.editorStore.loadInitialData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      // reload article state if slug changed
      this.props.editorStore.setArticleSlug(this.props.match.params.slug);
      this.props.editorStore.loadInitialData();
    }
  }

  changeTitle = e => this.props.editorStore.setTitle(e.target.value);
  changeDescription = e =>
    this.props.editorStore.setDescription(e.target.value);
  changeBody = e => this.props.editorStore.setBody(e.target.value);
  changeTagInput = e => this.setState({ tagInput: e.target.value });

  handleTagInputKeyDown = ev => {
    switch (ev.keyCode) {
      case 13:
      case 9:
      case 188:
        if (ev.keycode !== 9) ev.preventDefault();
        this.handleAddTag();
        break;
      default:
        break;
    }
  };

  handleAddTag = () => {
    if (this.state.tagInput) {
      this.props.editorStore.addTag(this.state.tagInput.trim());
      this.setState({ tagInput: "" });
    }
  };

  handleRemoveTag(tag) {
    if (this.props.editorStore.inProgress) {
      return;
    }
    this.props.editorStore.removeTag(tag);
  }

  submitForm = ev => {
    ev.preventDefault();
    const { editorStore } = this.props;
    editorStore.submit().then(article => {
      editorStore.reset();
      this.props.history.replace(`/article/${article.slug}`);
    });
  };

  render() {
    const {
      inProgress,
      errors,
      title,
      description,
      body,
      tagList
    } = this.props.editorStore;

    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ListErrors errors={errors} />

              <form>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder={"Article Title"}
                    value={title}
                    onChange={this.changeTitle}
                    disabled={inProgress}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder={"What's this article ablut?"}
                    value={description}
                    onChange={this.changeDescription}
                    disabled={inProgress}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    row="8"
                    placeholder={"write your article (in markdown"}
                    value={body}
                    onChange={this.changeBody}
                    disabled={inProgress}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder={"Enter tags"}
                    value={this.state.tagInput}
                    onBlur={this.handleAddTag}
                    onChange={this.changeTagInput}
                    onKeyDown={this.handleTagInputKeyDown}
                    disabled={inProgress}
                  />

                  <div className="tag-list">
                    {tagList.map(tag => {
                      return (
                        <span className="tag-default tag-pill" key={tag}>
                          <i
                            className="ion-close-round"
                            onClick={() => this.handleRemoveTag(tag)}
                          />
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </fieldset>

                <button
                  type="button"
                  className="btn btn-lg pull-xs-right btn-primary"
                  disabled={inProgress}
                  onClick={this.submitForm}
                >
                  Publish Article
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
