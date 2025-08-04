// import React from 'react';
import { useDrag } from 'react-dnd';
import '../styles/draggablewidget.css';

const DraggableWidgetWrapper = ({ children, widgetId, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'widget',
    item: { id: widgetId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`widget-wrapper ${isDragging ? 'dragging' : ''}`}
    >
      <button className="remove-button" onClick={onRemove}>✖</button>
      {children}
    </div>
  );
};

export default DraggableWidgetWrapper;
