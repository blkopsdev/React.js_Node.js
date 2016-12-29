import React, { PropTypes } from 'react';

import { renderDateTime } from '../../../utils';

function BundleItem({ item: { objectId, heading, priority, banner, createdAt, updatedAt } }) {
  return (
    <div>
      <h1>Bundle #{objectId}</h1>
      <table className="table table-bordered table-hover">
        <tbody>
        <tr>
          <td>ObjectId</td>
          <td>{objectId}</td>
        </tr>
        <tr>
          <td>Heading</td>
          <td>{heading}</td>
        </tr>
        <tr>
          <td>Priority</td>
          <td>{priority}</td>
        </tr>
        <tr>
          <td>Banner</td>
          <td>
            {banner ? <img className="img-responsive" src={banner} alt="" /> : null}
          </td>
        </tr>
        <tr>
          <td>Created</td>
          <td>{renderDateTime(createdAt)}</td>
        </tr>
        <tr>
          <td>Updated</td>
          <td>{renderDateTime(updatedAt)}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

BundleItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    banner: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default BundleItem;