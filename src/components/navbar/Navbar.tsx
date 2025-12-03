import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";


function Navbar() {


	useContext(AuthContext);


			<div
				className="w-full flex justify-center py-4
            			   bg-indigo-950 text-amber-500"
			>
				<div className="container flex justify-between text-lg mx-8">
					<Link to="/home" className="text-2xl font-bold">
						RH
					</Link>

					<div className="flex gap-4">
                        
						<Link to='/departamentos' className='hover:underline'>Departamentos</Link>
                    </div>
				</div>
			</div>



}

export default Navbar;
