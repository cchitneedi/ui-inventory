import React from 'react';
import { get } from 'lodash';

import InstanceFilters from './InstanceFilters';
import { getCurrentFilters } from '../../utils';

// instanceFilterRenderer is a function that takes a single argument `data`
// and returns a function that takes a single argument `onChange`.
const instanceFilterRenderer = data => onChange => {
  const {
    locations,
    instanceTypes,
    instanceFormats,
    instanceStatuses,
    modesOfIssuance,
    natureOfContentTerms,
    query,
    tags,
    onFetchFacets,
    parentResources,
    statisticalCodes,
  } = data;
  const activeFilters = getCurrentFilters(get(query, 'filters', ''));

  return (
    <InstanceFilters
      activeFilters={activeFilters}
      data={{
        locations,
        resourceTypes: instanceTypes,
        instanceFormats,
        instanceStatuses,
        modesOfIssuance,
        tagsRecords: tags,
        natureOfContentTerms,
        statisticalCodes,
        query,
        onFetchFacets,
        parentResources,
      }}
      onChange={onChange}
      onClear={(name) => onChange({ name, values: [] })}
    />
  );
};

export default instanceFilterRenderer;
