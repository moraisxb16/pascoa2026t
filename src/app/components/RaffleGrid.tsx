import { cn } from './ui/utils';

interface RaffleGridProps {
  totalNumbers: number;
  soldNumbers: number[];
  selectedNumbers: number[];
  onNumberClick: (number: number) => void;
}

export function RaffleGrid({ 
  totalNumbers, 
  soldNumbers, 
  selectedNumbers, 
  onNumberClick 
}: RaffleGridProps) {
  const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);

  const getNumberStatus = (num: number) => {
    if (soldNumbers.includes(num)) return 'sold';
    if (selectedNumbers.includes(num)) return 'selected';
    return 'available';
  };

  return (
    <div className="grid grid-cols-10 gap-2 md:gap-3">
      {numbers.map((num) => {
        const status = getNumberStatus(num);
        const isSold = status === 'sold';
        const isSelected = status === 'selected';

        return (
          <button
            key={num}
            onClick={() => !isSold && onNumberClick(num)}
            disabled={isSold}
            className={cn(
              "aspect-square rounded-lg font-semibold text-sm md:text-base transition-all duration-200",
              "flex items-center justify-center relative overflow-hidden",
              isSold && "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50",
              !isSold && !isSelected && "bg-white border-2 border-pink-200 text-pink-600 hover:border-pink-400 hover:bg-pink-50 hover:scale-105 shadow-sm",
              isSelected && "bg-gradient-to-br from-pink-500 to-purple-500 text-white border-2 border-purple-400 scale-105 shadow-lg"
            )}
          >
            {num}
            {isSold && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-gray-500 rotate-45"></div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
