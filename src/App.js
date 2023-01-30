import { Heading, Box } from '@chakra-ui/react';
import { NewClientForm } from './components/new-client-form/index'
import { appStyles } from './styles';


function App() {
  return (
    <Box p={4} sx={appStyles.body}>
      <Box sx={appStyles.container}>
        <Heading>PinApp</Heading>
        <NewClientForm />
      </Box>
    </Box>
  );
}

export default App;
