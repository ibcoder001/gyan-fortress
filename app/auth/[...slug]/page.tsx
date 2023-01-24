import Form from "@/components/parts/form";

type TAuthParams = {
  params: { slug: ["signup"] | ["login"] };
};

const Page = async ({ params }: TAuthParams) => {
  const { slug } = params;
  return (
    <section className="flex items-center justify-center h-screen">
      <Form type={slug[0]} />
    </section>
  );
};

export async function generateStaticParams() {
  return [{ slug: ["login"] }, { slug: ["signup"] }];
}
export const dynamic = "force-static";
export default Page;
