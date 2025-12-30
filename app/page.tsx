import { redirect } from "next/navigation";

export default function Home() {
  // Redirige al dashboard de tu proyecto principal
  redirect("/suma-os/dashboard");
}