import { useState } from "react";

function ChatFAQ() {
  const [mensagem, setMensagem] = useState<string>("");
  const [historico, setHistorico] = useState<{ tipo: "user" | "bot"; texto: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const chatName = import.meta.env.VITE_CHAT_NAME || "Chat RH Digital";

  const enviarPergunta = async () => {
    if (!mensagem.trim()) return;

    const apiKey = import.meta.env.VITE_TEXTCORTEX_API_KEY;

    if (!apiKey) {
      alert("API Key não configurada! Adicione VITE_TEXTCORTEX_API_KEY no .env");
      return;
    }

    // Coloca mensagem do usuário no histórico
    const mensagemUsuario = mensagem;
    setHistorico((prev) => [...prev, { tipo: "user", texto: mensagemUsuario }]);
    setMensagem("");
    setLoading(true);

    try {
      const resp = await fetch("https://api.textcortex.com/v1/texts/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Modelo válido da TextCortex
          max_tokens: 512,
          temperature: 0.7,
          n: 1,
          text: `Você é um sistema de RH digital chamado Nex.
Responda dúvidas dos colaboradores de forma curta, objetiva e clara.
Sempre explique:
1. O passo que o colaborador deve seguir dentro do sistema (ex.: acessar menu de férias, clicar em solicitar).
2. As regras trabalhistas básicas aplicáveis no Brasil (ex.: aviso prévio de 30 dias, direito a 30 dias de férias por ano).

Pergunta do colaborador: ${mensagemUsuario}`
        })
      });

      console.log("STATUS DA API:", resp.status);
      const data = await resp.json();
      console.log("RETORNO DA API:", data);

      if (!resp.ok) {
        throw new Error(`API Error: ${resp.status} - ${JSON.stringify(data)}`);
      }

      // TextCortex retorna a resposta em data.outputs[0].text
      const respostaBot =
        data?.data?.outputs?.[0]?.text || 
        data?.outputs?.[0]?.text ||
        data?.data?.text ||
        "Não consegui gerar resposta. Tente novamente.";

      setHistorico((prev) => [...prev, { tipo: "bot", texto: respostaBot }]);

    } catch (error: any) {
      console.error("Erro detalhado:", error);
      
      let mensagemErro = "Erro ao conectar com a API.";
      
      if (error.message?.includes("401")) {
        mensagemErro = "❌ Erro de autenticação. Verifique sua API Key no arquivo .env";
      } else if (error.message?.includes("400")) {
        mensagemErro = "❌ Erro na requisição. Verifique o console para mais detalhes.";
      } else if (error.message?.includes("429")) {
        mensagemErro = "❌ Limite de requisições excedido. Tente novamente mais tarde.";
      } else if (error.message?.includes("402")) {
        mensagemErro = "❌ Créditos da API esgotados. Verifique seu plano TextCortex.";
      }
      
      setHistorico((prev) => [
        ...prev,
        { tipo: "bot", texto: mensagemErro }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarPergunta();
    }
  };

  const limparHistorico = () => {
    setHistorico([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-orange-600">{chatName}</h1>
            {historico.length > 0 && (
              <button
                onClick={limparHistorico}
                className="text-sm text-gray-500 hover:text-orange-600 underline"
              >
                Limpar chat
              </button>
            )}
          </div>

          <div className="flex flex-col space-y-3 mb-6 h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
            {historico.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <div className="text-5xl mb-4">💼</div>
                <p className="text-lg font-semibold mb-2">Olá! Sou o Nex</p>
                <p className="text-sm">Seu assistente de RH digital</p>
                <p className="text-sm mt-2">Como posso ajudar você hoje?</p>
              </div>
            )}
            
            {historico.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.tipo === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[80%] whitespace-pre-wrap shadow-sm ${
                    msg.tipo === "user"
                      ? "bg-sky-700 text-white"
                      : "bg-white border-2 border-teal-500 text-gray-800"
                  }`}
                >
                  {msg.texto}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-teal-500 text-gray-800 p-3 rounded-lg max-w-[80%] shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                    <span className="ml-2">Nex está pensando...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <input
              className="border-2 border-gray-300 p-3 flex-1 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua dúvida sobre RH..."
              disabled={loading}
            />
            <button
              onClick={enviarPergunta}
              disabled={loading || !mensagem.trim()}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-yellow-500 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md"
            >
              {loading ? "⏳" : "Enviar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatFAQ;