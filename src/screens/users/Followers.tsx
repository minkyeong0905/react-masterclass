import { useOutletContext } from "react-router-dom";

interface IFollowersContext {
    userName: string;
}

function Followers() {
    const { userName } = useOutletContext<IFollowersContext>();
    
    return <h1>Here are {userName}'s followers</h1>;
}

export default Followers;