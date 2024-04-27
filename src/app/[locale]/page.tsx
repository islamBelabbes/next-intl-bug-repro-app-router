import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function IndexPage() {
  const cookie = cookies().toString();

  const tPromise = getTranslations("IndexPage");

  const dataPromise = fetch("http://localhost:3000/api/read", {
    method: "GET",
    headers: { Cookie: cookie },
    cache: "no-store",
  });

  const [data, t] = await Promise.all([dataPromise, tPromise]);

  const dataJson = await data.json();

  return (
    <ul>
      <li>{t("title")}</li>
      <li>{dataJson.data.value}</li>
    </ul>
  );
}
