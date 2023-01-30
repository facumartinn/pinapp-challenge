import { Heading, Box } from '@chakra-ui/react';
import { NewClientForm } from '../../components/new-client-form/index'
import { ClientList } from '../../components/client-list/index'
import { mainStyles } from './styles';

export default function Main() {
  return (
    <Box sx={mainStyles.body}>
      <Box sx={mainStyles.container}>
        <Heading sx={mainStyles.heading}>PinApp</Heading>
        <NewClientForm />
      </Box>
      <ClientList />
    </Box>
  );
}
