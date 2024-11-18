import { useAuthStore } from "../../store";
import { AvatarProps } from "./types";

const Avatar = ({}: AvatarProps) => {
  const { hasAccessToken, user } = useAuthStore();
  const hasAvatars = user?.avatars.length;

  return hasAccessToken ? (
    <picture className={`Avatar ${hasAvatars ? "" : "Avatar--empty"}`}>
      {hasAvatars ? (
        <>
          <source media="(max-width: 768px)" srcSet={user?.avatars[1]} />
          <img className="Avatar-image" src={user?.avatars[0]} alt="Avatar" />
        </>
      ) : (
        <p className="Avatar-name">{user?.displayName.charAt(0)}</p>
      )}
    </picture>
  ) : null;
};

export default Avatar;
