import { useState } from 'react'
import { db } from './firebaseConnection'
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'

import RoutesApp from './routes.js'

import './App.css'

function App() {
  return (
    <div className="App">
      
      <RoutesApp/>
    
    </div>
  );
}

export default App;
