import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-slate-950 py-10 text-white">
      <div className="section-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <Image src="/logo-fenix-valley.svg" alt="Fênix Valley" width={180} height={135} className="h-16 w-auto rounded bg-white p-1" />
          <p className="max-w-lg text-sm leading-6 text-slate-300">
            O empreendedorismo pode mudar vidas, transformar cidades e mudar o mundo.
          </p>
        </div>
        <Link
          href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-orange-300 hover:text-orange-200"
        >
          Fênix Valley no WhatsApp
        </Link>
      </div>
    </footer>
  );
}
