import React, {FC, useEffect, useRef, useState} from 'react';
import {IUser} from "../../types/types";
import s from "./FriendsList.module.css"

interface Props {
    friends: IUser[]
}
const FriendsList: FC<Props> = ({friends}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const dropdownRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])
    return (
        <div className={s.dropdown} ref={dropdownRef}>
            <button onClick={toggle} className={s.toggle_btn}>
                Количество друзей: {friends.length}
            </button>
            {
                isOpen &&
                <ul className={s.items_list}>
                    {
                        friends.map(friend =>
                            <li>{friend.first_name} {friend.last_name}</li>
                        )
                    }
                </ul>
            }
        </div>
    );
};

export default FriendsList;