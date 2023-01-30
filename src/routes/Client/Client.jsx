import { Heading, Box, Text } from '@chakra-ui/react';
import { clientStyles } from './styles';
import { onValue, ref } from "firebase/database";
import { db } from "../../database/firebase";
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { addYears } from "../../helpers/get-statistics";

const LIFE_EXPECTANCY = 100;

export default function Client() {
    let { clientId } = useParams();
    const [client, setClient] = useState({});

    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                const clients = Object.values(data);
                const getClient = clients.find((value) => value.id === clientId)
                setClient(getClient)
            }
        })
    }, []);

  return (
    <Box sx={clientStyles.container}>
        <Link to="/" style={clientStyles.backLink}>Volver a la home</Link>
        <Box sx={clientStyles.info}>
            {client ?
            <Box>
                <Heading>{`${client.name} ${client.lastName}`}</Heading>
                <Text><b>Edad:</b> {client.age}</Text>
                <Text><b>Fecha de nacimiento:</b> {client.birthDate}</Text>
                <Text><b>Fecha probable de muerte:</b> {addYears(client.birthDate, LIFE_EXPECTANCY)}</Text>
            </Box>
            : <Text>No hay informacion sobre este cliente.</Text>}
        </Box>
    </Box>
  );
}
