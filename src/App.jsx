import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AdviceSlipWidget from './component/AdviceSlipWidget';
import WeatherWidget from './component/WeatherWidget';
import JokeWidget from './component/JokeWidget';
import ZenQuotes from './component/ZenQuotes';
import WidgetToolbar from './component/WidgetToolbar';
import DashboardArea from './component/DashboardArea';
import './styles/App.css';

const App = () => {
  const availableWidgets = [
    { id: 'advice', name: '🧠 Daily Advice', component: 'AdviceSlipWidget' },
    { id: 'weather', name: '🌤️ Weather', component: 'WeatherWidget' },
    { id: 'joke', name: '🎲 Joke', component: 'JokeWidget' },
    { id: 'quotes', name: '📖 ZenQuotes', component: 'ZenQuotesWidget' }
  ];

 
  const [dashboardWidgets, setDashboardWidgets] = useState([]);

  //  TO ADD WIDGET
  const addWidget = (widgetType) => {
    const widget = availableWidgets.find(w => w.id === widgetType);
    if (!widget) return;
    const newWidget = {
      id: `${widgetType}-${Date.now()}`,
      type: widgetType,
      component: widget.component
    };
    setDashboardWidgets(prev => [...prev, newWidget]);
  };

  // TO REMOVE WIDGET
  const removeWidget = (widgetId) => {
    setDashboardWidgets(prev => prev.filter(w => w.id !== widgetId));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="container">
          <header className="header">
            <h1>Widget Dashboard</h1>
            <p>Drag widgets from the toolbar to customize your dashboard</p>
          </header>

          {/* WIDGET TOOLBAR */}
          <WidgetToolbar availableWidgets={availableWidgets} />

          {/* DASHBOARD AREA */}
          <DashboardArea 
            widgets={dashboardWidgets} 
            onAddWidget={addWidget}
            onRemoveWidget={removeWidget}
          />

        </div>
      </div>
    </DndProvider>
  );
};

export default App;
