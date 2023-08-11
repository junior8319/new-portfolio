import NavBar from './components/NavBar';
import Container from './styled/Container';
import { NormalPicture } from './styled/Pictures';
import Welcome from './components/Welcome';
import Stacks from './components/Stacks';
import picture from './assets/images/my_photo.jpeg';


function App() {
  return (
    <div>
      <NavBar />
      <Container>
        <NormalPicture src={ picture } alt="" />
        <Welcome />
        <Stacks />
      </Container>
    </div>
  );
}

export default App;
