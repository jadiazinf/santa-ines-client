import { Provider } from "react-redux"
import {store} from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <div className="">
        <p className="text-dimBlue ">Bienvenido a si gestionador de citas</p>
      </div>
    </Provider>
  )
}
