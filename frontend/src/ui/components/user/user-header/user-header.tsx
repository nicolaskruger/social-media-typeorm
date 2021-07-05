import { User } from "../../../../types"
import { UserImage } from "../user-img/user-img.component";
import "./user-header.css"

type UseHeaderProps = {
    user: User
}

export const UserHeader = (props: UseHeaderProps) => {
    const { user } = props;

    return (
        <div className="user-header" >
            <UserImage user={user} size="100px" />

            <div className="user-header__div">

                <span className="user-header__div__span user-header__name">
                    {user.name}
                </span>
                <span className="user-header__div__span user-header__email">
                    {user.email}
                </span>
            </div>

        </div >
    )
}