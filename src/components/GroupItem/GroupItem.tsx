import React, {FC} from 'react';
import {IGroup} from "../../types/types";
import FriendsList from "../FriendsList/FriendsList";
import s from "./GroupItem.module.css";

interface Props {
    group: IGroup
}
const GroupItem: FC<Props> = ({group}) => {
    return (
        <li>
            <div className={s.card}>
                <div className={s.avatar} style={{background: group.avatar_color ?? 'brown'}}/>
                <ul>
                    <li>
                        {group.name}
                    </li>
                    <li>
                        {group.closed ? 'Закрытая группа' : 'Открытая группа'}
                    </li>
                    <li>
                        Участников: {group.members_count}
                    </li>
                </ul>
                {
                    group.friends &&
                    <FriendsList friends={group.friends}/>
                }
            </div>
            <hr/>
        </li>
    );
};

export default GroupItem;