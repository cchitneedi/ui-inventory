import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { TextArea } from '@folio/stripes/components';

import RepeatableField from '../components/RepeatableField';

const SeriesFields = props => {
  const {
    canAdd,
    canEdit,
    canDelete,
  } = props;

  return (
    <RepeatableField
      name="series"
      label={<FormattedMessage id="ui-inventory.seriesStatements" />}
      addLabel={<FormattedMessage id="ui-inventory.addSeries" />}
      addButtonId="clickable-add-series"
      template={[{
        component: TextArea,
        disabled: !canEdit,
        rows: 1,
        name: 'value'
      }]}
      canAdd={canAdd}
      canDelete={canDelete}
      newItemTemplate={{ value: '' }}
    />
  );
};

SeriesFields.propTypes = {
  canAdd: PropTypes.bool,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
};
SeriesFields.defaultProps = {
  canAdd: true,
  canEdit: true,
  canDelete: true,
};

export default SeriesFields;
