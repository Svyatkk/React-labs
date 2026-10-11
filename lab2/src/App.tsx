import './App.css';
import { DashboardContainer } from './components/DashboardContainer';

export function App() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Дашборд світової економіки</h1>
        <p>Лабораторна робота №2 — Варіант 11 (World Bank API)</p>
      </header>

      <main>
        <DashboardContainer />
      </main>
    </div>
  );
}

export default App;
