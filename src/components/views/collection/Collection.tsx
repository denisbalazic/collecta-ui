import React, {ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {collectionSelector} from '../../../store/reducer/collection/collection.selector';
import {deleteCollectionAction, fetchCollectionAction} from '../../../store/saga/collection/collection.sagaActions';

const Collection = (): ReactElement => {
    const dispatch = useDispatch();
    const {collectionId = ''} = useParams();
    const {collection} = useSelector(collectionSelector);

    useEffect(() => {
        dispatch(fetchCollectionAction(collectionId));
    }, [collectionId, dispatch]);

    const handleDelete = (): void => {
        collection?.data._id && dispatch(deleteCollectionAction(collection.data._id));
    };

    return (
        <div>
            <div>
                <p>{collection?.data?.name}</p>
                <Link to={`/collections/${collectionId}/update`}>Edit</Link>
                <button type="button" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Collection;
