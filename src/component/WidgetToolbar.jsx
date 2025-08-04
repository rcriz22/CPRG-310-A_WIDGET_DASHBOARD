import React from 'react';
import { useDrag } from 'react-dnd';
import { Plus, Grip } from 'lucide-react';
import '../styles/widgettoolbar.css';

// DRAGGABLE ITEM
const DraggableWidget = ({ widget }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'widget',
    item: { widgetType: widget.id, widgetName: widget.name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`toolbar-widget ${isDragging ? 'dragging' : ''}`}
      title={`Drag to add ${widget.name}`}
    >
      <Grip size={16} className="drag-handle" />
      <span className="widget-name">{widget.name}</span>
      <Plus size={14} className="add-icon" />
    </div>
  );
};

// MAIN TOOLBAR COMPONENT
const WidgetToolbar = ({ availableWidgets }) => {
  return (
    <div className="widget-toolbar">
      {/* TOOLBAR HEADER/TITLE */}
      <div className="toolbar-header">
        <h3>🧰 Widget Toolbar</h3>
        <p>Drag widgets to your dashboard</p>
      </div>
      {/* LIST OF MY WIDGET */}
      <div className="toolbar-widgets">
        {availableWidgets.map((widget) => (
          <DraggableWidget key={widget.id} widget={widget} />
        ))}
      </div>
    </div>
  );
};

export default WidgetToolbar;