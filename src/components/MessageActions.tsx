import { MessageMetadata, useMessageMetadata } from "../ApiServices/messages";

const MessageAction = ({
    field,
    value,
    toggleValue
}: {
    field: keyof MessageMetadata;
    value: boolean;
    toggleValue: () => void;
}) => (
    <button onClick={toggleValue} className="MessageAction">
        {field}
    </button>
);

export const MessageActions = ({
    metadata,
    id
}: {
    metadata: MessageMetadata;
    id: string;
}) => {
    const { updateMessageMetadata } = useMessageMetadata();

    return (
        <section className="MessageActions">
            <MessageAction
                field="isArchived"
                value={metadata.isArchived}
                toggleValue={() =>
                    updateMessageMetadata(id, {
                        isArchived: !metadata.isArchived
                    })
                }
            />
            <MessageAction
                field="isMarkedAsSpam"
                value={metadata.isMarkedAsSpam}
                toggleValue={() =>
                    updateMessageMetadata(id, {
                        isMarkedAsSpam: !metadata.isMarkedAsSpam
                    })
                }
            />
            <MessageAction
                field="isMarkedAsImportant"
                value={metadata.isMarkedAsImportant}
                toggleValue={() =>
                    updateMessageMetadata(id, {
                        isMarkedAsImportant: !metadata.isMarkedAsImportant
                    })
                }
            />
        </section>
    );
};
