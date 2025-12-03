import { GithubLogoIcon } from "@phosphor-icons/react";

function Footer() {
  const data = new Date().getFullYear();

  return (
    <div className="w-full flex justify-center bg-orange-500 text-white py-6">
      <div
        className="container flex flex-col items-center gap-3 font-bold tracking-wide"
        style={{ wordSpacing: "2px" }}
      >
        {/* TEXTO PRINCIPAL */}
        <p className="text-center text-lg">
          NexumRH — Desenvolvido pelas Code Queens | © {data}
        </p>

        {/* TEXTO SECUNDÁRIO */}
        <p className="text-center text-sm opacity-90">
          Acesse nosso GitHub
        </p>

        <div className="flex gap-2">
          <a
            href="https://github.com/CodeQueensjava83"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition cursor-pointer"
          >
            <GithubLogoIcon size={48} weight="bold" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
