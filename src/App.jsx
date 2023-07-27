import { Provider } from "react-redux"
import {store} from './store';
import { Navbar } from "./components";

export const App = () => {
  return (
    <Provider store={store}>
      <div className="">
        <p className="text-dimBlue ">Bienvenido a si gestionador de citas</p>
      </div>
      <div className={`w-full sm:px-16 px-6 flex justify-center items-center `}>
        <div className={`xl:max-w-[1280px] w-full`}>
          <Navbar/>
        </div>
      </div>
    </Provider>
  )
}
