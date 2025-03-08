import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { persistStore } from 'redux-persist'
import { store } from './redux/store.ts'
import * as React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store)


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
