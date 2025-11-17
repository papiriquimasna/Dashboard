import { Avatar } from "@heroui/react";

const candidatesAvatars = {
  vizcarra: "https://i.pravatar.cc/150?u=vizcarra",
  forsyth: "https://i.pravatar.cc/150?u=forsyth",
  lopez: "https://i.pravatar.cc/150?u=lopez",
  acuna: "https://i.pravatar.cc/150?u=acuna",
};

interface CandidateAvatarProps {
  candidato: string;
  nombre: string;
}

export function CandidateAvatar({ candidato, nombre }: CandidateAvatarProps) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar 
        src={candidatesAvatars[candidato as keyof typeof candidatesAvatars]} 
        size="sm"
        name={nombre}
      />
      <span className="text-sm text-slate-700">{nombre}</span>
    </div>
  );
}

export default function AvatarsUsageCandidatesChart() {
  return (
    <div className="flex gap-3 items-center">
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar name="Junior" />
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar name="Jane" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar name="Joe" />
    </div>
  );
}
