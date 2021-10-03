import { contacts } from "../mock-data";

export type Contact = {
    name: string;
    email: string;
    icon?: string;
    /*
     * Technically the mock data does not include this, but I imagine we would not want to
     * be making API calls such as `HTTP:DELETE /contacts/zlevine@gmail.com`.
     *
     * Mock data has been updated to account for this
     */
    id: string;
};

export type NewContactData = Omit<Contact, "id">;

export const transformContactToString = (contact: Contact): string =>
    `${contact.name} <${contact.email}>`;

export const useContacts = () => {
    const createNewContact = (contact: NewContactData) =>
        console.log(`HTTP:POST /contacts`, { contact });

    const getContacts = () => contacts;

    const updateContact = (
        idOfContactToUpdate: string,
        contact: Partial<Contact>
    ) =>
        console.log(
            `HTTP:POST /contacts/${idOfContactToUpdate} ${contact.email}`,
            { contact }
        );

    const deleteContact = (idOfContactToDelete: string) =>
        console.log(`HTTP:DELETE /messages/${idOfContactToDelete}`);

    return {
        createNewContact,
        getContacts,
        updateContact,
        deleteContact
    };
};
