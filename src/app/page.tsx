'use client';
import Image from "next/image";
import { useState, useEffect } from "react";

import {auth, googleProvider, db} from "C:/Users/Gausar/Documents/test/my-app/firebase.config";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";


export default function Home() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flowerList, setFlowerList] = useState([]);
  const [newFlowerName, setNewFlowerName] = useState("");
  const [newFlowerType, setNewFlowerType] = useState("");
  const [newFlowerNumber, setNewFlowerNumber] = useState(0);
  const [updatedName, setUpdatedName] = useState("");


  const flowerCollectionRef = collection(db, "flowers");

  const getFlowerList = async () =>{
    try{
      const data = await getDocs(flowerCollectionRef);
      const filteredData:any = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filteredData);
      setFlowerList(filteredData);
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    getFlowerList();
  }, []);
  
  const addFlower = async() => {
    try{
      await addDoc(flowerCollectionRef, 
                  {flowerName: newFlowerName, 
                  flowerType: newFlowerType, 
                  numberRemainded: newFlowerNumber,
                  userId: auth?.currentUser?.uid,
                });
      getFlowerList();
    }
    catch(err){
      console.log(err);
    }
  }
  const deleteFlower = async(id:any) =>{
    try{
      const flowerDoc = doc(db, "flowers", id)
      await deleteDoc(flowerDoc);
      getFlowerList();
    }catch(err){
      console.log(err);
    }
  }
  const updateFlower = async(id:any) =>{
    try{
      const flowerDoc = doc(db, "flowers", id);
      updateDoc(flowerDoc, {flowerName: updatedName});

      getFlowerList();
    }catch(err){
      console.log(err);
    }
  }

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try{
      await createUserWithEmailAndPassword(auth, email, password);
    }catch(err){
      console.log(err);
    }
  }
  const signInWithGoogle = async() => {
    try{
      await signInWithPopup(auth, googleProvider);
    }catch(err){
      console.log(err);
    }
  }
  const logout = async() => {
    try{
      await signOut(auth);
    }catch(err){
      console.log(err);
    }
  }

  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 px-4 py-3 sm:px-6">
        
        <nav className="flex space-x-4 items-center">
          <div className="flex">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Flower shop</span>
                <img
                  alt="logo"
                  src="/images/logo.png"
                  className="w-15 h-15"
                />
              </a>
          </div>
          <div className="flex w-full justify-center h-10 items-center">
          <a href="#" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">
            Нүүр
          </a>
          <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Дэлгүүр
          </a>
          <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Цэцгийн төрөл
          </a>
          <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Холбоо барих
          </a>
          </div>
          <div>
            <div className="rounded-md bg-amber-100">
            <label htmlFor="">Email: </label>
            <input placeholder="email..." className="m-2 p-2 rounded-md border-2 border-dashed" onChange={(e) => setEmail(e.target.value)}></input>
            <br/>
            <label htmlFor="">Password: </label>
            <input placeholder="password..." className="m-2 p-2 rounded-md border-2 border-dashed" onChange={(e) => setPassword(e.target.value)} type="password"></input>
          </div>
          <button className="bg-blue-600 border-3 border-solid rounded-md p-2 m-2 hover:bg-blue-200 hover:text-white cursor-pointer" onClick={signIn}>Sign In</button>
          <button className="bg-blue-600 border-3 border-solid rounded-md p-2 m-2 hover:bg-blue-200 hover:text-white cursor-pointer" onClick={signInWithGoogle}>Sign In with Google</button>
          <button className="bg-gray-300 border-3 border-solid rounded-md p-2 m-2 hover:bg-blue-200 hover:text-white cursor-pointer" onClick={logout}>Logout</button>
          </div>
        </nav>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 bg-[url(/images/bg.jpg)] bg-no-repeat bg-cover backdrop-blur-sm">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-50">Цэцгийн дэлгүүүр</h1>
        <p className="text-gray-400 mb-8 max-w-xl">
          Манай дэлгүүрийн байршил "Цэцэг төв"-ийн нэг давхар.
        </p>
        <div className="w-48 md:w-72 lg:w-96">
          <Image
            src="/images/flower.jpeg"
            alt="flower"
            width={400}
            height={300}
            className="rounded-xl object-cover mb-10"
            priority
          />
        </div>
        <div>
          {flowerList.map((flower) =>(
            <div className="font-bold">
              <h1 className="text-4xl text-gray-50">{flower.flowerName}</h1>
              <p>Цэцгийн төрөл : {flower.flowerType}</p>
              <p className="text-purple-600">Үлдсэн тоо, ширхэг: {flower.numberRemainded}</p>
              <button className="bg-red-100 border-3 border-solid rounded-md p-2 m-2 hover:bg-red-300 hover:text-white cursor-pointer" onClick={() => deleteFlower(flower.id)}>Устгах</button>
              <br/>
              <input placeholder="Цэцгийн нэр өөрчлөх..." className="m-2 p-2 rounded-md border-2 border-dashed" onChange={(e) => setUpdatedName(e.target.value)}></input>
              <br/>
              <button className="bg-blue-100 border-3 border-solid rounded-md p-2 m-2 hover:bg-green-300 hover:text-white cursor-pointer" onClick={() => updateFlower(flower.id)}>Өөрчлөх</button>

            </div>
          ))}
        </div>
        <div>
        <div className="rounded-md bg-amber-100">
            <label htmlFor="">Цэцгийн нэр: </label>
            <input placeholder="Цэцгийн нэр..." className="m-2 p-2 rounded-md border-2 border-dashed" onChange={(e) => setNewFlowerName(e.target.value)}></input>
            <br/>
            <label htmlFor="">Төрөл: </label>
            <input placeholder="Цэцгийн төрөл..." className="m-2 p-2 rounded-md border-2 border-dashed" onChange={(e) => setNewFlowerType(e.target.value)}></input>
            <br/>
            <label>Тоо, ширхэг :</label>
            <input type="number" className="m-2 p-2 rounded-md border-2 border-dashed" placeholder="Зөвхөн тоо оруулна..." onChange={(e) => setNewFlowerNumber(e.target.value)} />
          </div>
          <button className="bg-blue-600 border-3 border-solid rounded-md p-2 m-2 hover:bg-blue-200 hover:text-white cursor-pointer" onClick={addFlower}>Нэмэх</button>

        </div>
      </main>

      <footer className="bg-gray-800 text-gray-300 text-center py-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Gausar Amangyeldi.
        </p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-white text-sm">Facebook</a>
          <a href="#" className="hover:text-white text-sm">Instagram</a>
        </div>
      </footer>
    </div>
  );
}
