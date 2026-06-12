import { WORLDS } from "@/lib/progress";
import WorldClient from "./WorldClient";

export function generateStaticParams() {
  return WORLDS.map(w => ({ id: String(w.id) }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <WorldClient params={params} />;
}
