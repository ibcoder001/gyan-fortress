import { signIn } from "next-auth/react";
import Image from "next/image";

const SocialFormButton = ({
  provider,
  callbackUrl,
  imageUrl,
  imageAlt,
}: {
  provider: string;
  callbackUrl: string;
  imageUrl: string;
  imageAlt: string;
}) => {
  return (
    <button
      type="button"
      className="flex flex-row items-center justify-center w-20 h-20 p-1 bg-transparent cursor-pointer hover:shadow-2xl"
      onClick={() => signIn(provider, { callbackUrl })}
    >
      <Image
        src={imageUrl}
        width={64}
        height={64}
        alt={imageAlt}
        className={`object-contain ${
          provider === "github" ? "rounded-full bg-light" : ""
        }`}
      />
    </button>
  );
};

export default SocialFormButton;
