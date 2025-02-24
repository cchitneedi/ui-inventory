import React, {
  useCallback,
  useMemo,
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Draggable } from 'react-beautiful-dnd';
import { FormattedMessage } from 'react-intl';

import Holding from './Holding';

const dragStyles = {
  background: '#333',
  color: '#fff',
  borderRadius: '3px',
  padding: '5px',
  width: 'fit content',
  height: 'fit content'
};

const getItemStyle = (draggableStyle, dragging) => {
  return {
    userSelect: 'none',
    width: '100%',
    ...draggableStyle,
    ...(dragging ? dragStyles : {}),
  };
};

const DraggableHolding = ({
  provided,
  snapshot,
  draggingHoldingsCount,
  holding,
  onViewHolding,
  onAddItem,
  ...rest
}) => {
  const rowStyles = useMemo(() => (
    getItemStyle(
      provided.draggableProps.style,
      snapshot.isDragging,
    )
  ), [provided.draggableProps.style, snapshot.isDragging]);
  const child = (
    <div
      id={`item-row-${holding.id}`}
      data-row-inner
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={rowStyles}
    >
      {
        snapshot.isDragging
          ? (
            <FormattedMessage
              id="ui-inventory.moveItems.move.holdings.count"
              values={{ count: draggingHoldingsCount || 1 }}
            />
          ) : (
            <Holding
              {...rest}
              isDraggable
              holding={holding}
              onViewHolding={onViewHolding}
              onAddItem={onAddItem}
            />
          )
      }
    </div>
  );

  if (!snapshot.isDragging) return child;

  return ReactDOM.createPortal(child, document.getElementById('ModuleContainer'));
};

DraggableHolding.propTypes = {
  draggingHoldingsCount: PropTypes.number,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
  holding: PropTypes.object,
  onViewHolding: PropTypes.func,
  onAddItem: PropTypes.func,
};

const HoldingContainer = ({
  location,
  history,

  instance,
  holding,
  isDraggable,
  holdingIndex,
  draggingHoldingsCount,
  ...rest
}) => {
  const onViewHolding = useCallback(() => {
    history.push({
      pathname: `/inventory/view/${instance.id}/${holding.id}`,
      search: location.search,
    });
  }, [location.search, instance.id, holding.id]);

  const onAddItem = useCallback(() => {
    history.push({
      pathname: `/inventory/create/${instance.id}/${holding.id}/item`,
      search: location.search,
    });
  }, [instance.id, holding.id]);

  return isDraggable ? (
    <Draggable
      key={`${holding.id}`}
      draggableId={`holding-${holding.id}`}
      index={holdingIndex}
    >
      {(provided, snapshot) => (
        <DraggableHolding
          provided={provided}
          snapshot={snapshot}
          draggingHoldingsCount={draggingHoldingsCount}
          holding={holding}
          onViewHolding={onViewHolding}
          onAddItem={onAddItem}
          {...rest}
        />
      )}
    </Draggable>
  ) : (
    <Holding
      {...rest}
      holding={holding}
      onViewHolding={onViewHolding}
      onAddItem={onAddItem}
    />
  );
};

HoldingContainer.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,

  instance: PropTypes.object.isRequired,
  holding: PropTypes.object.isRequired,
  holdingIndex: PropTypes.number,
  isDraggable: PropTypes.bool,
  draggingHoldingsCount: PropTypes.number,
};

export default withRouter(HoldingContainer);
