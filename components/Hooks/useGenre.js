const useGenre = (selectedGenres) => {
  if (selectedGenres.length < 1) return "";

  const genreIds = selectedGenres.map((genre) => genre.id);
  return genreIds.reduce(
    (accumulator, currentValue) => `${accumulator},${currentValue}`
  );
};

export default useGenre;
