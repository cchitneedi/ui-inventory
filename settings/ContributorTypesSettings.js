import React from 'react';
import PropTypes from 'prop-types';
import ControlledVocab from '@folio/stripes-smart-components/lib/ControlledVocab';

class FormatTypesSettings extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  render() {
    const { formatMessage } = this.props.stripes.intl;

    return (
      <this.connectedControlledVocab
        {...this.props}
        baseUrl="contributor-types"
        records="contributorTypes"
        label={formatMessage({ id: 'ui-inventory.contributorTypes' })}
        labelSingular={formatMessage({ id: 'ui-inventory.contributorType' })}
        objectLabel={formatMessage({ id: 'ui-inventory.contributors' })}
        hiddenFields={['description', 'numberOfObjects']}
        columnMapping={{ name: 'Contributor Types' }}
        nameKey="name"
        id="contributor-types"
      />
    );
  }
}

export default FormatTypesSettings;
