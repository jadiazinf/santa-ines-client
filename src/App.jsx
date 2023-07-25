import { Provider } from "react-redux"
import {store} from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <div>Santa Ines</div>
    </Provider>
  )
}
