
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/diary?page=1&create=false");
}
