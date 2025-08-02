import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { shortName } from "@/lib/utils";

export default function PlayerAvatar({
  avatar,
  name = "Player",
  handleChangeAvatar = null,
  className = "",
}) {
  return (
    <Avatar
      className={"w-12 h-12" + (handleChangeAvatar ? " cursor-pointer" : "") + " " + className}
      {...(handleChangeAvatar ? { onClick: handleChangeAvatar } : {})}
    >
      <AvatarImage
        src={
          `data:image/svg+xml;utf8,${encodeURIComponent(avatar)}` ||
          "/placeholder.svg"
        }
      />
      <AvatarFallback className="text-lg">{shortName(name)}</AvatarFallback>
    </Avatar>
  );
}
