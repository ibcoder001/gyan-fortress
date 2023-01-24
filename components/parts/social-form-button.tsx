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
      className="flex flex-row items-center justify-start w-auto h-24 p-1 bg-white rounded-md cursor-pointer hover:shadow-2xl"
      onClick={() => signIn(provider, { callbackUrl })}
    >
      <Image
        src={imageUrl}
        width={96}
        height={96}
        alt={imageAlt}
        className="object-contain ml-2"
      />
    </button>
  );
};

export default SocialFormButton;
