import React from "react";
import { useState } from "react";

const PokemonFetch = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [postMessage, setPostmessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pokemonName) {
      return;
    }
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (!response.ok) {
        throw new Error("Failed to find post");
      }
      const data = await response.json();
      console.log(data);
      setPostmessage(data);
    } catch (e) {
      console.log(e);
      setError("⚠️ Oops! That Pokémon does not exist.");
    }
  };

  const handleChange = (e) => {
    setPokemonName(e.target.value);
  };

  return (
    <>
      <div>pokemonFetch</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Pokemon Name"
          value={pokemonName}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <div>{error}</div>}
      {postMessage && (
        <div>
          <h1>Name: {postMessage.name}</h1>
          <p>Height: {postMessage.height}</p>
          <p>Weight: {postMessage.weight}</p>
          <img
            src={postMessage.sprites.front_default}
            alt={postMessage.name}
            width={120}
          />
        </div>
      )}
    </>
  );
};

export default PokemonFetch;
