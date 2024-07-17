"use client";

import React, { useState, useEffect } from "react";
import KittenCard from "./KittenCard";
import { getRandomKittens } from "@/services";

const GameBoard = () => {
  const [numOfKittens, setNumOfKittens] = useState(6);
  const [kittens, setKittens] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [solvedKittensArray, setSolvedKittensArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameWin, setGameWin] = useState(false);

  // Function to fetch kittens
  const fetchKittens = async () => {
    const response = await getRandomKittens(numOfKittens);
    if (response.isError) {
      alert(response.error);
    } else {
      console.log("API Reponse:", response.images);
      //randomize and duplicatre kittens here
     const duplicatedAndShuffledKittens = randomizeAndDuplicateKittens(response.images);
      setKittens(duplicatedAndShuffledKittens);
    }
	setLoading(false);
  };

  // function to duplicate and randomize kittens
  const randomizeAndDuplicateKittens = (kittensArray) => {
    console.log("Kittens Array", kittensArray);
    let newArray = [];
    kittensArray.forEach((kitten, index) => {
      let kittenCopy1 = { ...kitten, id: index + "copy1" };
      let kittenCopy2 = { ...kitten, id: index + "copy2" };

      newArray.push(kittenCopy1, kittenCopy2);
    });
	  console.log("Duplicated Kittens", newArray);
	  newArray = newArray.sort(() => Math.random() - 0.5)
	  console.log('Duplicated and Shuffled', newArray);
	  return newArray;

  };

//function to check matches
useEffect(() => {
if (cardTwo != null) {
  const timeout = setTimeout(() => {
    if (cardOne.url === cardTwo.url && cardOne.id !== cardTwo.id) {
        setSolvedKittensArray((prev) => [...prev, cardOne.url]

        )
    }
    setCardOne(null);
    setCardTwo(null);
}, 500)
return () => clearTimeout(timeout);
}
}, [cardTwo]);

  useEffect(() => {
    fetchKittens();
  }, []);

  return (
    <div className="flex flex-wrap flex-row gap-4 w-full justify-center">
      {loading ? (
        <p className="text-xl">
          Loading<span className="loading laoding-dots loading-lg"></span>
        </p>
      ) : (
        kittens.map((kitten) => (
          <KittenCard
            key={kitten?.id}
            kitten={kitten}
            cardOne={cardOne}
            setCardOne={setCardOne}
            cardTwo={cardTwo}
            setCardTwo={setCardTwo}
            solvedKittensArray={solvedKittensArray}
            setSolvedKittensArray={setSolvedKittensArray}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;
