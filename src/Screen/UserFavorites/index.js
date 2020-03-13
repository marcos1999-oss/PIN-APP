import React from "react";
import { NavigationEvents } from "react-navigation";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPostsMeta, getLikedPosts, getLikedPostsPagination } from '../../redux/selectors/index'
import * as postActions from "../../redux/actions/postActions"

import UserFavoriteComponent from "./UserFavoritesContainer";


class UserFavorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.props.postActions.fetchLikedPosts({
      currentPage: this.props.pagination.currentPage,
      perPage: this.props.pagination.perPage
    });
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.isTesting && (<NavigationEvents
          onDidFocus={this.props.navigation.getParam('onDidFocus')}
        />)}

        <UserFavoriteComponent {...this.props} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    postsMeta: getPostsMeta(state),
    likedPosts: getLikedPosts(state),
    pagination: getLikedPostsPagination(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postActions: bindActionCreators(postActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFavorites);
