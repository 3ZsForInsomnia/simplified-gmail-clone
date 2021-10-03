import { FC } from "react";
import {
    Message,
    useMessages,
    defaultMessageMetadata
} from "../ApiServices/messages";
import { Contact, transformStringToContact } from "../ApiServices/contacts";
import { MessageActions } from "./MessageActions";
import { ShowContact } from "./Contacts";

const MessageTableCell: FC = ({ children }) => (
    <td className="MessageTableCell">{children}</td>
);

const MessageRow = ({
    message,
    deleteMessage
}: {
    message: Message;
    deleteMessage: (id: string) => void;
}) => {
    const contact = transformStringToContact(message.from);

    return (
        <tr className="MessageRow">
            <MessageTableCell>{message.to}</MessageTableCell>
            <MessageTableCell>{message.from}</MessageTableCell>
            <MessageTableCell>
                <ShowContact contact={contact} />
            </MessageTableCell>
            <MessageTableCell>{message.body}</MessageTableCell>
            <MessageTableCell>
                <MessageActions
                    metadata={defaultMessageMetadata}
                    id={message.id}
                />
            </MessageTableCell>
            <MessageTableCell>{message.date}</MessageTableCell>
            <MessageTableCell>
                <button onClick={() => deleteMessage(message.id)}>
                    Delete{" "}
                </button>
            </MessageTableCell>
        </tr>
    );
};

const MessageTableHeaderItem = ({ text }: { text: string }) => (
    <th className="MessageTableHeader">{text}</th>
);

const MessageTableHeader = ({ columns }: { columns: string[] }) => (
    <tr className="MessageTableHeader">
        {columns.map(column => (
            <MessageTableHeaderItem key={column} text={column} />
        ))}
    </tr>
);

export const MessagesTable = ({ currentUser }: { currentUser: Contact }) => {
    const { getMessages, deleteMessage } = useMessages(currentUser);

    const messages = getMessages();

    const columns: string[] = [
        "To",
        "From",
        "Contact Info",
        "Message",
        "Actions",
        "Date Sent/Received",
        "Delete Message"
    ];

    return (
        <table className="MessagesTable">
            <thead>
                <MessageTableHeader columns={columns} />
            </thead>
            <tbody>
                {messages.map(message => (
                    <MessageRow
                        key={message.id}
                        message={message}
                        deleteMessage={deleteMessage}
                    />
                ))}
            </tbody>
        </table>
    );
};
