const React = require('react'),
  ActionCreators = require('../actions/ActionCreators');

class RepoMgr extends React.Component {

  constructor(props) {
    super(props);
    let {detail} = this.props;
    this.state = {detail};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({detail: nextProps.detail});
  }

  render() {
    console.log('state', this.state);
    let {detail} = this.state;
    return (
      <form onSubmit={this._onSubmit.bind(this)}>
        <div>
          <label>Name :</label> {detail.id}
        </div>
        <div>
          <label>Label :</label><input onChange={this._changeLabel.bind(this)} value={detail.label}/>
        </div>
        <div>
          <label>Comments :</label><textarea onChange={this._changeComments.bind(this)} value={detail.comment}/>
        </div>
        <button type='submit'>Submit</button>
      </form>
    );

  }

  _onSubmit(event) {
    event.preventDefault();
    ActionCreators.putDetail(this.state.detail);
  }

  _changeLabel(val) {
    let {detail} = this.state;
    detail.label = val.target.value;
    this.setState({detail})
  }

  _changeComments(val) {
    let {detail} = this.state;
    detail.comment = val.target.value;
    this.setState({detail})
  }
}

module.exports = RepoMgr;