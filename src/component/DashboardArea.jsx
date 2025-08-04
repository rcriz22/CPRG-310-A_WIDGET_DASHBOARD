// import React from 'react';
import { useDrop } from 'react-dnd';
import AdviceSlipWidget from './AdviceSlipWidget';
import WeatherWidget from './WeatherWidget';
import ZenQuotesWidget from './ZenQuotes';
import DraggableWidgetWrapper from './DraggableWidgetWrapper';
import JokeWidget from './JokeWidget';
import '../styles/dashboardarea.css';

// WIDGET MAPPING
const WIDGET_COMPONENTS = {
  AdviceSlipWidget: AdviceSlipWidget,
  WeatherWidget: WeatherWidget,
  ZenQuotesWidget: ZenQuotesWidget,
  JokeWidget: JokeWidget
};

const DashboardArea = ({ widgets, onAddWidget, onRemoveWidget }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'widget',
    drop: (item) => {
      onAddWidget(item.widgetType);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

const renderWidget = (widget) => {
    const WidgetComponent = WIDGET_COMPONENTS[widget.component];
    if (!WidgetComponent) {
      return <div className="widget">Widget not found</div>;
    }

    return (
      <DraggableWidgetWrapper 
        key={widget.id} 
        widgetId={widget.id}
        onRemove={() => onRemoveWidget(widget.id)}
      >
        <WidgetComponent />
      </DraggableWidgetWrapper>
    );
};

  return (
    <div className="dashboard-area-wrapper">
      <div
        ref={drop}
        className={`dashboard-area ${isOver ? 'drop-zone-active' : ''}`}
      >
        {widgets.length === 0 ? (
          <div className="empty-dashboard">
            <h3>🎯 Your Dashboard</h3>
            <p>Drag widgets from the toolbar above to get started!</p>
            <div className="drop-hint">
              Drop widgets here
            </div>
          </div>
        ) : (
          <div className="widgets-grid">
            {widgets.map(renderWidget)}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardArea;
