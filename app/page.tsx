import { redirect } from "next/navigation";

export default function Home() {
  // Redirige automáticamente de "/" a "/dashboard"
  redirect("/dashboard");
}