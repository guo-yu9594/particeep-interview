import './App.css';
import Filter from './components/Filter';
import List from './components/List';
import ListPagination from './components/Pagination';
import StackedBar from './components/StackedBar';

function App() {
  return (
    <div className="app">
      <Filter />
      <List />
      <ListPagination />
    </div>
  );
}

export default App;
