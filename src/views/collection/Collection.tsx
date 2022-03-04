import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {collectionSelector} from '../../store/reducer/collection/collection.selector';
import {deleteCollectionAction, fetchCollectionAction} from '../../store/saga/collection/collection.sagaActions';
import {getDynamicRoute, routeInd} from '../../router/routes';

const Collection = () => {
    const dispatch = useDispatch();
    const {collectionId = ''} = useParams();
    const {collection} = useSelector(collectionSelector);

    useEffect(() => {
        dispatch(fetchCollectionAction(collectionId));
    }, [collectionId]);

    const handleDelete = () => {
        collection?.data._id && dispatch(deleteCollectionAction(collection.data._id));
    };

    return (
        <div>
            <p>Collection</p>
            <div>
                <p>{collection?.data?.name}</p>
                <Link to={getDynamicRoute(routeInd.UPDATE_COLLECTION, [collectionId])}>Edit</Link>
                <button type="button" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Collection;
