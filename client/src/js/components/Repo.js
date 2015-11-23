const React = require('react'),
    ActionCreators = require('../actions/ActionCreators'),
    Issue = require('./Issue'),
    Mgr = require('./RepoMgr'),
    DetailStore = require('../stores/DetailStore'),
    IssueStore = require('../stores/IssueStore');

class Repo extends React.Component {
    getStateFromStores() {
        let issues = IssueStore.get();
        let detail = DetailStore.get();
        return {
            issues,
            detail
        };
    }
    componentWillMount() {
        this.setState(this.getStateFromStores());
        IssueStore.addChangeListener(this._onChange.bind(this));
        DetailStore.addChangeListener(this._onChange.bind(this));

    }
    render() {
        let {repos} = this.props,
            {issues,detail} = this.state;
        if (_.isEmpty(repos)) {
            return (
                <div>
                    Loading...
                </div>
            );
        } else {
            return (
                <div>
                    <ul>
                        {repos.map(repo =>
                                <li key={repo.id}>
                                    <a onClick={this._getIssue} data-tag={repo.url}>{repo.name}
                                    </a>
                                </li>
                        )}
                    </ul>
                    <div className="issueList">
                        <p> Issues </p>
                        <Issue issues={issues}/>
                    </div>
                    <div className="repoManager">
                        <p> Repo Manager </p>
                        <Mgr detail={detail}/>
                     </div>
                </div>
            );
        }
    }
    _getIssue(event) {
        event.preventDefault();
        ActionCreators.getIssue(event.target.dataset.tag);
        ActionCreators.getDetail(event.target.dataset.tag);
    }

    _onChange() {
        this.setState(this.getStateFromStores());
    }
}

module.exports = Repo;