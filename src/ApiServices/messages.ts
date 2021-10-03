import { messages } from "../mock-data";
import { Contact, transformContactToString } from "./contacts";

export type MessageMetadata = {
    isMarkedAsSpam: boolean;
    isMarkedAsImportant: boolean;
    isArchived: boolean;
};

export type Message = {
    subject: string;
    body: string;
    from: string;
    to: string;
    date: string;
    "reply-to": string;
};

export type MessageFormInputs = Pick<Message, "subject" | "body" | "to"> & {
    contact: Contact;
};

const createNewMessageData = (sendersContactInfo: Contact) => (
    messageData: MessageFormInputs
): { message: Message } => ({
    message: {
        ...messageData,
        from: sendersContactInfo.name,
        to: transformContactToString(messageData.contact),
        "reply-to": transformContactToString(messageData.contact),
        date: Date.now().toString()
    }
});

const useMessages = (currentUsersContactInfo: Contact) => {
    const createMessageDataForCurrentUser = createNewMessageData(
        currentUsersContactInfo
    );

    const getMessages = () => messages;

    const getMessage = (messageID: string) =>
        messages.find(message => message.id === messageID);

    const deleteMessage = (idOfMessageToDelete: string) =>
        console.log(`HTTP:DELETE /messages/${idOfMessageToDelete}`);

    const updateMessageMetadata = (
        idOfMessageToUpdate: string,
        metadata: Partial<MessageMetadata>
    ) =>
        console.log(`HTTP:POST /message/${idOfMessageToUpdate}`, {
            metadata
        });

    const createNewMessage = (newMessageData: MessageFormInputs) =>
        console.log(
            `HTTP:POST /messages`,
            createMessageDataForCurrentUser(newMessageData)
        );

    return {
        getMessage,
        getMessages,
        createNewMessage,
        deleteMessage,
        updateMessageMetadata
    };
};

export default useMessages;
