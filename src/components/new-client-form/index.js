import { Box, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { uid } from "uid";
import { db } from "../../database/firebase";
import { set, ref}  from "firebase/database"

const initialClientValues = {
    name: "",
    lastName: "",
    age: "",
    birthDate: ""
}

export const NewClientForm = () => {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false);
    const [client, setClient] = useState(initialClientValues)

    const handleChange = (event) => {
        const value = event.target.value;
        setClient({
          ...client,
          [event.target.name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await createClient(client);
            console.log(response);
            setIsLoading(false);
            toast({
                title: 'Client created.',
                description: response.message,
                status: 'success',
                duration: 3000,
              })
            return response;
        } catch (error) {
            console.log(error)
        }
        event.target.reset();
    }

    const createClient = async (client) => {
        const uuid = uid();
        try {
            await set(ref(db, `/${uuid}`), {
                id: uuid,
                client
            });
            return {"message": "Client created successfully!"};
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <Box>
                <label>Nombre</label>
                <Input type="text" name="name" value={client.name} onChange={handleChange} required />
                <label>Apellido</label>
                <Input type="text" name="lastName" value={client.lastName} onChange={handleChange} required />
            </Box>
            <Box>
                <label>Edad</label>
                <Input type="number" name="age" value={client.age} onChange={handleChange} required />
                <label>Fecha de nacimiento</label>
                <Input type="date" name="birthDate" value={client.birthDate} onChange={handleChange} required />
            </Box>
            <Button isLoading={isLoading} type="submit" sx={{marginTop: 4}}>Crear cliente</Button> 
        </form>
    )
}