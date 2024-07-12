import React, { useEffect, useState,useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom'

const BannerHome = () => {
  const bannerData = useSelector(state => state.movflixData.bannerData);
  const imageURL = useSelector(state => state.movflixData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    setCurrentImage(prev => (prev < bannerData.length - 1 ? prev + 1 : 0));
  }, [bannerData.length]);

  const handlePrev = useCallback(() => {
    setCurrentImage(prev => (prev > 0 ? prev - 1 : bannerData.length - 1));
  }, [bannerData.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [handleNext]);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handlePlayNow = (data) => {
    navigate(`/${data.media_type}/${data.id}`);
  };

  return (
    <section className='w-full h-full'>
      <div className='flex min-h-full max-h-[95vh] overflow-hidden' {...handlers}>
        {bannerData.map((data, index) => {
          return (
            <div
              key={data.id + "bannerHome" + index}
              className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all'
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className='w-full h-full'>
                <img src={imageURL + data.backdrop_path} alt="" className='h-full w-full object-cover' />
              </div>

              {/* Navigation buttons for large screens */}
              <div className='absolute top-0 w-full h-full items-center hidden lg:flex justify-between px-4 group-hover:flex'>
                <button onClick={handlePrev} className='bg-white p-1 rounded-full text-xl z-10 text-black'>
                  <FaAngleLeft />
                </button>
                <button onClick={handleNext} className='bg-white p-1 rounded-full text-xl z-10 text-black'>
                  <FaAngleRight />
                </button>
              </div>

              <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

              <div className='container mx-auto'>
                <div className='w-full absolute bottom-0 max-w-md px-6'>
                  <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-3xl'>{data.title || data?.original_name}</h2>
                  <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>

                  <div className='flex items-center gap-4'>
                    <p>Rating : {Number(data.vote_average).toFixed(1)} +</p>
                    <span>|</span>
                    <p>View : {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  <div>
                    <button onClick={() => handlePlayNow(data)} className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-500 to-orange-300 shadow-md transition-all hover:scale-105'>Play Now</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BannerHome;
