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

export const transformStringToContact = (contact: string): NewContactData => ({
    email: contact.substring(contact.indexOf("<") + 1, contact.indexOf(">")),
    name: contact.substring(0, contact.indexOf("<") - 1)
});

export const useContacts = () => {
    const createNewContact = (contact: NewContactData) =>
        console.log(`HTTP:POST /contacts`, contact);

    const getContacts = () => contacts;

    /**
     * In a perfect world, this value would come from the message itself, i.e. "wasThisMessageSentByAnExistingContact: boolean"
     *
     * For now, to avoid changing too much of the existing setup, leaving it as separate, and would use state management to
     * not have to re-retrieve contacts every time we render a message. Since we are not actually making an API call here/it is
     * just a mock, not too worried for now
     */
    const getContact = (idOfContact: string) =>
        contacts.find(
            contact =>
                contact.id === idOfContact || contact.email === idOfContact
        );

    const updateContact = (
        idOfContactToUpdate: string,
        contact: Partial<Contact>
    ) =>
        console.log(
            `HTTP:POST /contacts/${idOfContactToUpdate} ${contact.email}`,
            contact
        );

    const deleteContact = (idOfContactToDelete: string) =>
        console.log(`HTTP:DELETE /messages/${idOfContactToDelete}`);

    return {
        createNewContact,
        getContacts,
        getContact,
        updateContact,
        deleteContact
    };
};
