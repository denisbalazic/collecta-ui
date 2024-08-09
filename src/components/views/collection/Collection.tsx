import React, {ReactElement} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDeleteCollectionMutation, useFetchCollectionQuery} from '../../../store/api/collection.api';

const Collection = (): ReactElement => {
    const {collectionId = ''} = useParams();

    const {data: collection, error, isLoading} = useFetchCollectionQuery(collectionId);

    const [deleteCollection, {error: deleteError}] = useDeleteCollectionMutation();

    if (error) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleDelete = (): void => {
        collection?._id && deleteCollection(collection?._id);
    };

    return (
        <div>
            <div>
                <p>{collection?.name}</p>
                <Link to={`/collections/${collectionId}/update`}>Edit</Link>
                <button type="button" onClick={handleDelete}>
                    Delete
                </button>
                {deleteError && <div>Error deleting</div>}
            </div>
        </div>
    );
};

export default Collection;
