import React, {ReactElement, useState} from 'react';
import Field from '../../compounds/Field';
import Form from '../../compounds/Form';
import {H1} from '../../elements/headers';
import CenteredContainer from '../../elements/CenteredContainer';
import {useCreateCollectionMutation} from '../../../store/api/collection.api';

const NewCollectionForm = (): ReactElement => {
    const [name, setName] = useState<string>('');

    const [createCollection, {error}] = useCreateCollectionMutation();

    const handleSubmit = (): void => {
        createCollection({name});
    };

    return (
        <CenteredContainer>
            <Form onSubmit={handleSubmit}>
                <H1>New collection</H1>
                <Field
                    label="Name"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(name, value) => setName(value as string)}
                />
            </Form>
            {error && <div>Error creating</div>}
        </CenteredContainer>
    );
};

export default NewCollectionForm;
