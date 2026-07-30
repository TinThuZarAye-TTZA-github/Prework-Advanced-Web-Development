import "./App.css"
import {Routes, Route} from "react-router-dom"
import ShowCreators from "./pages/ShowCreators.jsx"
import ViewCreator from "./pages/ViewCreator.jsx"
import EditCreator from "./pages/EditCreator.jsx"
import AddCreator from "./pages/AddCreator.jsx"

function App() {
  return (
    <Routes>

      <Route path="/" element={<ShowCreators/>}/>
      <Route path="/new" element={<AddCreator />}/>
      <Route path="/creator/:id" element={<ViewCreator/>} />
      <Route path="/creator/:id/edit" element={<EditCreator />} />
    </Routes>
  )
}

export default App