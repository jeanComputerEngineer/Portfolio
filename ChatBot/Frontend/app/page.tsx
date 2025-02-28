// app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
    // Se quiser redirecionar imediatamente para login, use:
    redirect("/login");

    // Ou se quiser exibir algo e dar a opção de ir para login:
    // return (
    //   <div className="flex items-center justify-center h-screen">
    //     <a href="/login" className="text-blue-500 underline">Ir para Login</a>
    //   </div>
    // );
}
