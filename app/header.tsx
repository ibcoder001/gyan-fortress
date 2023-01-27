import Logo from "@/components/parts/logo";
import MenuNavigation from "@/components/parts/menuNavigation";
import UserNavigation from "@/components/parts/user-navigation";
import { Container } from "@/components/styled/layout";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

const Header = async ({ page }: { page: string }) => {
  const session = await unstable_getServerSession(authOptions);
  return (
    <header className="fixed flex items-center justify-center w-full h-24 px-4 bg-light">
      <Container className="flex items-center justify-between w-full">
        <section className="flex items-center justify-between flex-1 lg:gap-20 lg:justify-start">
          <Logo />
          <MenuNavigation numberOfItems={0} session={session} page={page} />
        </section>
        <UserNavigation numberOfItems={0} session={session} />
      </Container>
    </header>
  );
};

export default Header;
