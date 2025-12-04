import { useState } from "react";

function ChatFAQ() {
  const [mensagem, setMensagem] = useState<string>("");
  const [historico, setHistorico] = useState<{ tipo: "user" | "bot"; texto: string }[]>([]);

  // Nome do chat vindo do .env (se não existir, usa padrão)
  const chatName = import.meta.env.VITE_CHAT_NAME || "Chat RH Digital";

  const enviarPergunta = async () => {
    const apiKey = import.meta.env.VITE_TEXTCORTEX_API_KEY;

    // adiciona a mensagem do usuário ao histórico
    setHistorico((prev) => [...prev, { tipo: "user", texto: mensagem }]);

    try {
      const resp = await fetch("https://api.textcortex.com/v1/texts/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          formality: "default",
          max_tokens: 512,
          model: "gemini-2-5-flash",
          n: 1,
          source_lang: "pt",
          target_lang: "pt-br",
          temperature: 0.3,
          text: `Você é um sistema de RH digital de uma empresa.
Responda dúvidas dos colaboradores de forma curta, objetiva e clara.
Sempre explique:
1. O passo que o colaborador deve seguir dentro do sistema (ex.: acessar menu de férias, clicar em solicitar).
2. As regras trabalhistas básicas aplicáveis no Brasil (ex.: aviso prévio de 30 dias, direito a 30 dias de férias por ano).
Pergunta: ${mensagem}`
        })
      });

      const data = await resp.json();
      console.log("Resposta da API:", data);

      if (data?.data?.outputs?.length > 0) {
        const respostaBot = data.data.outputs[0].text;
        setHistorico((prev) => [...prev, { tipo: "bot", texto: respostaBot }]);
      } else {
        setHistorico((prev) => [...prev, { tipo: "bot", texto: "Não consegui gerar resposta." }]);
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      setHistorico((prev) => [...prev, { tipo: "bot", texto: "Erro inesperado ao tentar se conectar à API." }]);
    }

    setMensagem("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Nome do chat configurável */}
      <h1 className="text-2xl font-bold mb-4">{chatName}</h1>

      {/* Área de mensagens estilo chat */}
      <div className="flex flex-col w-full max-w-md space-y-2 mb-4">
        {historico.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.tipo === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.texto}
          </div>
        ))}
      </div>

      {/* Campo de entrada */}
      <div className="flex w-full max-w-md space-x-2">
        <input
          className="border p-2 flex-1 rounded"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua dúvida..."
        />
        <button
          onClick={enviarPergunta}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ChatFAQ;