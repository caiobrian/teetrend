interface RatingStarsProps {
  rating: number
  size?: number
}

export function RatingStars({ rating, size = 5 }: RatingStarsProps) {
  return (
    <div className='flex items-center'>
      {Array.from({ length: size }).map((_, i) => {
        const filled = i < Math.floor(rating)
        const halfFilled = !filled && i < Math.ceil(rating) && rating % 1 !== 0

        return (
          <svg
            key={i}
            className={`h-5 w-5 ${
              filled
                ? 'text-yellow-400'
                : halfFilled
                  ? 'text-yellow-400'
                  : 'text-gray-300'
            }`}
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            {halfFilled ? (
              <defs>
                <linearGradient id={`half-gradient-${i}`}>
                  <stop offset='50%' stopColor='currentColor' />
                  <stop offset='50%' stopColor='#d1d5db' />
                </linearGradient>
              </defs>
            ) : null}
            <path
              fill={halfFilled ? `url(#half-gradient-${i})` : 'currentColor'}
              d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
            />
          </svg>
        )
      })}
    </div>
  )
}
