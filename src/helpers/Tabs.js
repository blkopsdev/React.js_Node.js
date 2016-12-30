import React, { PropTypes } from 'react';

import { LinkTo } from '../helpers';

function Tabs({ modelsName, itemID }) {
  return (
    <div className="row m-b">
      <div className="col-md-12">
        <div className="btn-group">
          <LinkTo button color="default" url={modelsName}>
            All Records
          </LinkTo>
          <LinkTo button color="success" url={`${modelsName}/new`}>
            Create
          </LinkTo>
          {itemID ? (
              <LinkTo button color="info" url={`${modelsName}/${itemID}`}>
                Show
              </LinkTo>
            ) : null}
          {itemID ? (
              <LinkTo button color="primary" url={`${modelsName}/${itemID}/edit`}>
                Edit
              </LinkTo>
            ) : null}
          {itemID ? (
              <LinkTo button color="danger" url={`${modelsName}/${itemID}/delete`}>
                Delete
              </LinkTo>
            ) : null}
        </div>
      </div>
    </div>
  );
}

Tabs.propTypes = {
  itemID: PropTypes.string,
};

export default Tabs;
