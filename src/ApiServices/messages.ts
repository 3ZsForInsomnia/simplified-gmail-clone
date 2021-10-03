import { messages } from "../mock-data";
import { Contact, transformContactToString } from "./contacts";

export type MessageMetadata = {
    isMarkedAsSpam: boolean;
    isMarkedAsImportant: boolean;
    isArchived: boolean;
};
export const defaultMessageMetadata: MessageMetadata = {
    isMarkedAsImportant: false,
    isMarkedAsSpam: false,
    isArchived: false
};

export type Message = {
    subject: string;
    body: string;
    from: string;
    to: string;
    id: string;
    date: string;
    "reply-to"?: string;
};

export type MessageFormInputs = Pick<Message, "subject" | "body" | "to"> & {
    contact: Contact;
};

const createNewMessageData = (sendersContactInfo: Contact) => (
    messageData: MessageFormInputs
): { message: Omit<Message, "id"> } => ({
    message: {
        ...messageData,
        from: sendersContactInfo.name,
        to: transformContactToString(messageData.contact),
        "reply-to": transformContactToString(messageData.contact),
        date: Date.now().toString()
    }
});

export const useMessages = (currentUsersContactInfo: Contact) => {
    const createMessageDataForCurrentUser = createNewMessageData(
        currentUsersContactInfo
    );

    const getMessages = () => messages;

    const getMessage = (messageID: string) =>
        messages.find(message => message.id === messageID);

    const deleteMessage = (idOfMessageToDelete: string) =>
        console.log(`HTTP:DELETE /messages/${idOfMessageToDelete}`);

    const createNewMessage = (newMessageData: MessageFormInputs) =>
        console.log(
            `HTTP:POST /messages`,
            createMessageDataForCurrentUser(newMessageData)
        );

    return {
        getMessage,
        getMessages,
        createNewMessage,
        deleteMessage
    };
};

export const useMessageMetadata = () => {
    const updateMessageMetadata = (
        idOfMessageToUpdate: string,
        metadata: Partial<MessageMetadata>
    ) => console.log(`HTTP:POST /message/${idOfMessageToUpdate}`, metadata);

    return { updateMessageMetadata };
};

export default useMessages;
