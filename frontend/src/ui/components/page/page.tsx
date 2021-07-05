import { User } from "../../../types"
import { UserHeader } from "../user"

import "./page.css"

type PageProps = {
    user: User
}

export const Page = (prosp: PageProps) => {

    const { user } = prosp;

    return (
        <div className="page container">
            <UserHeader user={user} />
        </div>
    )
}