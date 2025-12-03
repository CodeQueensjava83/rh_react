import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormColaboradores from '../formcolaboradores/FormColaboradores';

function ModalColaboradores() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Novo Colaborador
                    </button>
                }
                modal
                contentStyle={{
                    borderRadius: '1rem',
                    paddingBottom: '2rem'
                }}
            >
                <FormColaboradores />
            </Popup>
        </>
    );
}

export default ModalColaboradores;