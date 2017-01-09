import range from 'lodash/range';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import React, { PropTypes, Component } from 'react';
import { getFormValues, Field, reduxForm } from 'redux-form';

import { LinkTo, renderField, renderFileUploadField, renderTextareaField, MultipleKeyValueList, renderDropdownList, renderMultiselect, renderDatePicker, renderCheckboxField } from '../../../helpers';

class SpecialForm extends Component {

  state = {

  };

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const {
      item,
      item: {
        incentive_name, category, incentive_type, attendee_min, attendee_max, amount, item_name, description,
        redemption_options, promo_code, start_time, end_date, without_end_date, image, status
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      this.setState({
        category: isObject(category) ? category.value : null,
        incentive_type: isObject(incentive_type) ? incentive_type.value : null,
        redemption_options: isObject(redemption_options) ? redemption_options.value : null
      });
      initialize({
        incentive_name, category, incentive_type, attendee_min, attendee_max, amount, item_name, description,
        redemption_options, promo_code, start_time, end_date, without_end_date, image, status
      });
    }
  }

  render () {
    const { item, errorMessage, handleSubmit, onSave } = this.props;
    const { category, incentive_type, redemption_options } = this.state;

    return (
      <form onSubmit={handleSubmit(special => onSave(special))}>
        <Field
          name="incentive_name"
          component={renderField}
          label="Incentive Name"
        />
        <Field
          name="category"
          valueField="value"
          textField="name"
          component={renderDropdownList}
          data={[
            {name: 'Group Rate', value: 'group_rate'},
            {name: 'Special Event', value: 'special_event'},
            {name: 'Birthday', value: 'birthday'},
            {name: 'Happy Hour', value: 'happy_hour'},
            {name: 'Brunch', value: 'brunch'}
          ]}
          label="Category"
          afterChange={({ value }) => this.setState({ category: value })}
        />
        <Field
          name="incentive_type"
          valueField="value"
          textField="name"
          component={renderDropdownList}
          data={[
            {name: 'Fixed Amount', value: 'fixed_amount'},
            {name: '% Discount', value: 'per_cent_discount'},
            {name: 'Free Item', value: 'free_item'},
            {name: 'VIP Benefits', value: 'vip_benefits'}
          ]}
          label="Incentive Type"
          afterChange={({ value }) => this.setState({ incentive_type: value })}
        />
        {category === 'group_rate' ? (
            <Field
              name="attendee_min"
              component={renderDropdownList}
              data={range(1, 21)}
              label="Attendee Minimum"
            />
          ) : null}
        {category === 'group_rate' ? (
            <Field
              name="attendee_max"
              component={renderDropdownList}
              data={range(1, 21)}
              label="Attendee Maximum"
            />
          ) : null}
        <Field name="amount" component={renderField} type="number" label="Amount" />
        {incentive_type === 'free_item' || incentive_type === 'vip_benefits' ? (
            <Field name="item_name" component={renderField} label="Item Name" />
          ) : null}
        <Field name="description" component={renderTextareaField} label="Description" />
        <Field
          name="redemption_options"
          valueField="value"
          textField="name"
          component={renderDropdownList}
          data={incentive_type === 'vip_benefits' ? [{name: 'Mobile Image', value: 'mobile_image'}] : [
            {name: 'Mobile Image', value: 'mobile_image'},
            {name: 'Not Required', value: 'not_required'},
            {name: 'Promo Code', value: 'promo_code'}
          ]}
          label="Redemption Options"
          afterChange={({ value }) => this.setState({ redemption_options: value })}
        />
        <Field name="promo_code" component={renderField} label="Promo Code" />
        <Field
          name="start_time"
          component={MultipleKeyValueList}
          label="Start Time"
        />
        <Field
          name="end_date"
          component={renderDatePicker}
          label="End Date"
        />
        <Field name="without_end_date" component={renderCheckboxField} label="No End Date" />
        {redemption_options === 'mobile_image' ? (
            <Field name="image" component={renderFileUploadField} label="Image Upload" />
          ) : null}
        <Field
          name="status"
          valueField="value"
          textField="name"
          component={renderDropdownList}
          data={[
            {name: 'Active', value: 'active'},
            {name: 'Pending Approval', value: 'pending_approval'},
            {name: 'Expired', value: 'expired'}
          ]}
          label="Status"
        />
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="specials">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create Special' : 'Update Special'}
          </button>
        </div>
      </form>
    );
  }
}

SpecialForm.defaultProps = {
  item: {}
};

SpecialForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};


export default reduxForm({ form: 'special' })(SpecialForm);