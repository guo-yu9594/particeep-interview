import Filter, { FilterProps } from "./Filter";

const appBarStyle: React.CSSProperties = {
  width: '90vw',
  height: '10vh',
  backgroundColor: '#3c00ff',
  margin: '1vh',
  marginBottom: '1.5vh',
  borderRadius: '40px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  color: 'white',
}

interface AppBarProps {
  filterProps: FilterProps
}

const AppBar = ({filterProps}: AppBarProps): JSX.Element => {
  return (
    <div style={appBarStyle} >
      <h1 style={{marginLeft: "3%"}} >Interview.</h1>
      <Filter movies={filterProps.movies} setMovies={filterProps.setMovies} />
    </div>
  );
}

export default AppBar;