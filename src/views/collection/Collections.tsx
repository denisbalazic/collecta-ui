import React, {ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCollectionsAction} from '../../store/saga/collection/collection.sagaActions';
import {collectionSelector} from '../../store/reducer/collection/collection.selector';

const Collections = (): ReactElement => {
    const dispatch = useDispatch();
    const {collections} = useSelector(collectionSelector);

    useEffect(() => {
        dispatch(fetchCollectionsAction());
    }, [dispatch]);

    return (
        <div>
            <p>Collections</p>
            <div>
                {collections &&
                    collections.data.map((collection) => (
                        <div key={`collections-list-item-${collection._id}`}>
                            <Link to={`/collections/${collection._id as string}`}>{collection.name}</Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Collections;
