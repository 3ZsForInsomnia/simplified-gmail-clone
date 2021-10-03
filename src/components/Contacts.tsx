import { useState } from "react";
import { useContacts } from "../ApiServices/contacts";

type NewOrExistingContact = {
    name: string;
    email: string;
    icon?: string;
    id?: string;
};

const UpdateOrCreateNewContactForm = ({
    handleContactInfo,
    existingContactInfo
}: {
    handleContactInfo: (contactInfo: NewOrExistingContact) => void;
    existingContactInfo?: NewOrExistingContact;
}) => {
    const [email, setEmail] = useState(existingContactInfo?.email || "");
    const [name, setName] = useState(existingContactInfo?.name || "");
    const [icon, setIcon] = useState(existingContactInfo?.icon || "");

    return (
        <section className="UpdateOrCreateNewContactForm">
            hi there
            <form>
                <input
                    className="UpdateOrCreateNewContactForm__Input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <input
                    className="UpdateOrCreateNewContactForm__Input"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input
                    className="UpdateOrCreateNewContactForm__Input"
                    type="text"
                    placeholder="Icon"
                    value={icon}
                    onChange={event => setIcon(event.target.value)}
                />
                <button
                    className="UpdateOrCreateNewContactForm__Submit"
                    onClick={() => handleContactInfo({ name, email, icon })}
                >
                    {existingContactInfo
                        ? "Update Contact"
                        : "Create New Contact"}
                </button>
            </form>
        </section>
    );
};

export const ShowContact = ({ contact }: { contact: NewOrExistingContact }) => {
    const {
        getContact,
        createNewContact,
        deleteContact,
        updateContact
    } = useContacts();

    const [isAddingOrUpdatingContact, setIsAddingOrUpdatingContact] = useState(
        false
    );

    const existingContact = getContact(contact.email);
    const doesContactAlreadyExist = !!existingContact?.id;

    return (
        <section className="Contact">
            <p className="Contact__Name">{contact.name}</p>
            {isAddingOrUpdatingContact ? (
                <UpdateOrCreateNewContactForm
                    handleContactInfo={({ name, email }) => {
                        doesContactAlreadyExist
                            ? updateContact(existingContact.id, { name, email })
                            : createNewContact({ email, name });
                        setIsAddingOrUpdatingContact(false);
                    }}
                    existingContactInfo={existingContact}
                />
            ) : (
                ""
            )}
            {doesContactAlreadyExist ? (
                <div className="Contact__Exists">
                    <button
                        className="Contact__RemoveExisting"
                        onClick={() => deleteContact(existingContact.id)}
                    >
                        X
                    </button>
                    <button
                        className="Contact__UpdateExisting"
                        onClick={() => setIsAddingOrUpdatingContact(true)}
                    >
                        +
                    </button>
                </div>
            ) : (
                <div className="Contact__DoesNotExist">
                    <button
                        className="Contact__AddNewContact"
                        onClick={() => setIsAddingOrUpdatingContact(true)}
                    >
                        +
                    </button>
                </div>
            )}
        </section>
    );
};
