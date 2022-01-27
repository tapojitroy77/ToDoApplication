import React, { useEffect, useState } from 'react';
import { RootState } from '../../../app/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '../../../app/hooks';
import { AddItem } from '../addItem/addItem';
import { getData } from '../../../database/firebase/firebaseClient'
import {
    addItem,
    updateAddItemPopup,
    updateItemStatus,
    getItem
} from './itemSlice';
import styles from './Item.module.css';
export function Item() {
    useEffect(() => {
        getData('item', (data) => dispatch(getItem(data)));
    }, []);
    const { items, displayAddItemPopup } = useSelector((state: RootState) => state.toDoTask);
    const dispatch = useAppDispatch();
    return (
        <div className={styles.checkboxes}>
            <div>
                <ul>
                {items.map(item => {
                    return (
                    <li>
                        <input type="checkbox" checked={item.isCompleted} onChange={() => dispatch(updateItemStatus(item))}/>
                        {item.name}
                    </li>
                    )
                })}
                </ul>
            </div>
            <div>
                <button className={styles.button} onClick={() => dispatch(updateAddItemPopup(true))}>
                    <img src={process.env.PUBLIC_URL + '/add.png'} alt="add"/>
                </button>
            </div>
            {displayAddItemPopup &&
                <AddItem
                    onClose={() => dispatch(updateAddItemPopup(false))}
                    onSave={(itemName: string) => dispatch(addItem(itemName))}
                />
            }
        </div>
    );
}