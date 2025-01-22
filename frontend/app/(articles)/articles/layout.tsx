import ArticlesLayout from "@/components/layouts/ArticlesLayout";

export default function ArticlesLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ArticlesLayout>{children}</ArticlesLayout>;
}
