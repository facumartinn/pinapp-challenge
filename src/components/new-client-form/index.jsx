import { Box, Input, Button, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { uid } from "uid";
import { db } from "../../database/firebase";
import { set, ref}  from "firebase/database"
import { clientFormStyles } from "./styles";

const initialClientValues = {
    name: "",
    lastName: "",
    age: 0,
    birthDate: "",
    id: ""
}

export const NewClientForm = () => {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [client, setClient] = useState(initialClientValues);

    const handleChange = (event) => {
        setClient({
          ...client,
          [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await createClient(client);
            setIsLoading(false);
            event.target.reset();
            toast({
                title: 'Cliente creado.',
                description: response.message,
                status: 'success',
                position: 'bottom-left',
                duration: 3000,
              });
            return response;
        } catch (error) {
            console.log(error);
            toast({
                title: 'No se ha creado cliente.',
                description: "Intenta de nuevo.",
                status: 'error',
                position: 'bottom-left',
                duration: 3000,
              });
        }
    }

    const createClient = async (client) => {
        const uuid = uid();
        try {
            await set(ref(db, `/${uuid}`), {
                ...client,
                id: uuid
            });
            return {"message": "Cliente creado con exito!"};
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <Box>
                <Text sx={clientFormStyles.label}>Nombre</Text>
                <Input sx={clientFormStyles.input} type="text" name="name" value={client.name} onChange={handleChange} required />
                <Text sx={clientFormStyles.label}>Apellido</Text>
                <Input sx={clientFormStyles.input} type="text" name="lastName" value={client.lastName} onChange={handleChange} required />
                <Text sx={clientFormStyles.label}>Edad</Text>
                <Input sx={clientFormStyles.input} type="number" name="age" value={client.age} onChange={handleChange} required />
                <Text sx={clientFormStyles.label}>Fecha de nacimiento</Text>
                <Input sx={clientFormStyles.input} type="date" name="birthDate" value={client.birthDate} onChange={handleChange} required />
            </Box>
            <Box sx={clientFormStyles.buttonContainer}>
                <Button isLoading={isLoading} type="submit" sx={clientFormStyles.button}>Crear cliente</Button> 
            </Box>
        </form>
    )
}