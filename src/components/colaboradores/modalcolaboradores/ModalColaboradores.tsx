import Popup from "reactjs-popup";
import FormColaboradores from "../formcolaboradores/FormColaboradores";

function ModalColaboradores() {
    return (
        <>
            <Popup
                trigger={
                    <button
                        className="px-4 py-2 rounded-3xl lg:rounded-full bg-white/25 hover:bg-white/85 border border-white transition"
                        onClick={() => console.log("Botão clicado!")}
                    >
                        Cadastrar Colaborador
                    </button>
                }
                modal
                contentStyle={{
                    width: "40%",
                    maxWidth: "90%",
                    height: "80%",
                    borderRadius: '1rem',
                    paddingBottom: '2rem',
                    backgroundColor: 'white'
                }}
            >
                <FormColaboradores />
            </Popup>
        </>
    );
}
export default ModalColaboradores;