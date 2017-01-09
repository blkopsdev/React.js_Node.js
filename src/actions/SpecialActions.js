import moment from 'moment';
import { browserHistory } from 'react-router';

import { ADD_SPECIALS, ADD_SPECIAL, SPECIAL_ERROR, SHOW_SPECIAL, REMOVE_SPECIAL } from '../constants/Special';

import { apiRequest } from '../utils';

export function addSpecials(items = [], count = 0) {
  return {
    type: ADD_SPECIALS,
    items,
    count
  };
}

export function addSpecial(item = {}) {
  return {
    type: ADD_SPECIAL,
    item
  };
}

export function specialError(errorMessage) {
  return {
    type: SPECIAL_ERROR,
    errorMessage
  };
}

export function showSpecial(item = {}) {
  return {
    type: SHOW_SPECIAL,
    item
  };
}

export function removeSpecial(itemId) {
  return {
    type: REMOVE_SPECIAL,
    itemId
  };
}

export function fetchSpecials({ search, include, order }) {
  const url = [
    'Special?count=1',
    order ? `&order=${order}` : null,
    include ? `&include=${include}` : null,
    search ? `&where=${JSON.stringify({
        $or: [
          { first_name: { $regex: search, $options: 'i' } },
          { last_name: { $regex:  search, $options: 'i' } },
          { special_email: { $regex:  search, $options: 'i' } },
        ]
      })}` : null
  ].join('');

  return dispatch => apiRequest.get(url)
    .then(({ data: { results, count } }) => dispatch(addSpecials(results, count)));
}

export function fetchSpecial(itemId) {
  return dispatch => apiRequest.get('Special', itemId)
    .then(({ data }) => dispatch(showSpecial(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createSpecial(special) {
  return dispatch => apiRequest.post('Special', {
    ...special,
    birthday: special.birthday ? moment(special.birthday).format('MM/DD/YYYY') : null
  })
    .then(() => browserHistory.push('/specials'))
    .catch(({ response: { data: { error } } }) => dispatch(specialError(error)));
}

export function updateSpecial(itemID, special) {
  return dispatch => apiRequest.put('Special', itemID, {
    ...special,
    birthday: special.birthday ? moment(special.birthday).format('MM/DD/YYYY') : null
  })
    .then(() => browserHistory.push('/specials'))
    .catch(({ response: { data: { error } } }) => dispatch(specialError(error)));
}

export function deleteSpecial(itemID) {
  return dispatch => apiRequest.delete('Special', itemID)
    .then(() => dispatch(removeSpecial(itemID)))
    .then(() => browserHistory.push('/specials'));
}