import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchBundle } from '../../actions/BundleActions';

import { BundleItem } from '../../components';
import { Loading } from '../../helpers';

class BundleShowPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchBundle: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchBundle } = this.props;
    fetchBundle(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { item } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <BundleItem item={item} />
      </Loading>
    );
  }
}

export default connect(({ bundles: { item } }) => ({ item }), { fetchBundle })(BundleShowPage);
