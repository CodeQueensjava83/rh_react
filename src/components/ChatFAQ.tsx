import { useState } from "react";

function ChatFAQ() {
  const [mensagem, setMensagem] = useState<string>("");
  const [historico, setHistorico] = useState<{ tipo: "user" | "bot"; texto: string }[]>([]);

  const chatName = import.meta.env.VITE_CHAT_NAME || "Chat RH Digital";

  const enviarPergunta = async () => {
    const apiKey = import.meta.env.VITE_TEXTCORTEX_API_KEY;

    // Coloca mensagem do usuário no histórico
    setHistorico((prev) => [...prev, { tipo: "user", texto: mensagem }]);

    try {
      const resp = await fetch("https://api.textcortex.com/v1/texts/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "GPT-4o Mini", 
          temperature: 0.3,
          max_tokens: 512,
          messages: [
            {
              role: "system",
              content: `Você é um sistema de RH digital chamado Nex.
Responda dúvidas dos colaboradores de forma curta, objetiva e clara.
Sempre explique:
1. O passo que o colaborador deve seguir dentro do sistema (ex.: acessar menu de férias, clicar em solicitar).
2. As regras trabalhistas básicas aplicáveis no Brasil (ex.: aviso prévio de 30 dias, direito a 30 dias de férias por ano).`
            },
            { role: "user", content: mensagem }
          ]
        })
      });

      // Logs úteis para diagnóstico
      console.log("STATUS DA API:", resp.status);
      const data = await resp.json();
      console.log("RETORNO DA API:", data);

      const respostaBot =
        data?.choices?.[0]?.message?.content || "Não consegui gerar resposta.";

      setHistorico((prev) => [...prev, { tipo: "bot", texto: respostaBot }]);

    } catch (error) {
      console.error("Erro inesperado:", error);
      setHistorico((prev) => [
        ...prev,
        { tipo: "bot", texto: "Erro inesperado ao tentar se conectar à API." }
      ]);
    }

    setMensagem("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-4 text-orange-600">{chatName}</h1>

      <div className="flex flex-col w-full max-w-md space-y-2 mb-4">
        {historico.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.tipo === "user"
                ? "bg-sky-800 text-white self-end"
                : "bg-teal-600 text-white self-start"
            }`}
          >
            {msg.texto}
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-md space-x-2">
        <input
          className="border border-gray-300 p-2 flex-1 rounded text-gray-700"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua dúvida..."
        />
        <button
          onClick={enviarPergunta}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:text-orange-500"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ChatFAQ;

