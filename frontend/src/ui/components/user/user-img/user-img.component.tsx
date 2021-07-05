import { useState } from "react";
import { User } from "../../../../types"

import "./user-img.css";

type UserImgProps = {
    user: User,
    size: string
}

export const UserImage = (pros: UserImgProps) => {

    const { user, size } = pros;

    const [url, setUrl] = useState(user.urlImage);

    const handleErro = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setUrl("https://pbs.twimg.com/media/EaHoBj3UcAAIOSe.jpg")
    }

    return <img style={{ width: size, height: size }} className="user-img" src={url} onError={handleErro} alt={user.name} />

}