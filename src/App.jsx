import { Provider } from "react-redux"
import {store} from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <div className="">
        <p className="text-2xl text-red-400 ">Bienvenido a si gestionador de citas</p>
      </div>
    </Provider>
  )
}
