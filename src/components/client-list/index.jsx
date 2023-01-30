import { Box, Button, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading, } from "@chakra-ui/react";
import { onValue, ref, remove } from "firebase/database";
import { db } from "../../database/firebase";
import { useState, useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getAverage, getStandardDeviation } from "../../helpers/get-statistics";
import { clientListStyles } from "./styles";

const averageInitialValue = {
    ageAverage: 0,
    standardDeviation: 0
}
export const ClientList = () =>  {
    const [clientList, setClientList] = useState([]);
    const [statistics, setStatistics] = useState(averageInitialValue);

    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();

            if (data !== null) {
                let ageArray = [];
                setClientList([]);
                setStatistics(0);
                const clients = Object.values(data);
                clients.map((value) => {
                    setClientList((oldClientList) => [...oldClientList, value]);
                    ageArray.push(value.age);
                })
                setStatistics({ageAverage: getAverage(ageArray), standardDeviation: getStandardDeviation(ageArray)});
            }
        })
    }, []);

    const deleteClient = (clientId) => remove(ref(db, `/${clientId}`));

    return (
        <Box sx={clientListStyles.container}>
            <Box sx={clientListStyles.stats}>
                <Text><b>Promedio de edad entre clientes:</b> {statistics.ageAverage}</Text>
                <Text><b>Desviación estándar entre las edades de todos los clientes:</b> {statistics.standardDeviation}</Text>
            </Box>
            <Heading sx={clientListStyles.heading}>Listado de clientes</Heading>
            {clientList.length > 0 ?
                <TableContainer sx={clientListStyles.table.container}>
                    <Table size='sm'>
                        <Thead>
                            <Tr sx={clientListStyles.table.item}>
                            <Th sx={clientListStyles.table.item}>Nombre y apellido</Th>
                            <Th sx={clientListStyles.table.item}>Edad</Th>
                            <Th sx={clientListStyles.table.item}>Fecha de nacimiento</Th>
                            <Th sx={clientListStyles.table.item}></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {clientList.map((client) => 
                            <Tr key={client.id}>
                                <Td sx={clientListStyles.table.name}><Link to={`/client/${client.id}`}>{`${client.name} ${client.lastName}`}</Link></Td>
                                <Td sx={clientListStyles.table.item}>{client.age}</Td>
                                <Td sx={clientListStyles.table.item}>{client.birthDate}</Td>
                                <Td sx={clientListStyles.table.item}>
                                    <Button sx={clientListStyles.deleteButton} onClick={() => deleteClient(client.id)}>
                                        <BsFillTrashFill style={clientListStyles.trashIcon} />
                                    </Button>
                                </Td>
                            </Tr>
                        )}
                        </Tbody>
                    </Table>
                </TableContainer>
            : <Text sx={clientListStyles.emptyMsg}>No hay clientes.</Text>
            }
        </Box>
    )
}