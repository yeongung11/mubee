export const useRating = () => {
    const convertFive = (score: number) => (score / 2).toFixed(1);
    return { convertFive };
};
