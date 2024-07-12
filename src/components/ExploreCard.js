import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ExploreCard = ({data, trending, index, media_type}) => {
    const imageURL = useSelector(state => state.movieoData.imageURL)

    const mediaType = data.media_type ?? media_type;

  return (
     <Link to={"/" + mediaType + "/" + data.id} className='block rounded overflow-hidden relative hover:scale-105 transition-all' style={{ width: '100%', height: '100%' }}>
        {
            data?.poster_path ? (

                <img src={imageURL+data?.poster_path} alt="" />
            ) : (
                <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>
                    No image found
                </div>
            )
        }
        <div className='absolute top-4'>
            {
                trending && (
                    <div className='py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden'>
                        #{index} Trending
                    </div>
                )
            }
        </div>

        <div className='absolute bottom-0 h-14 backdrop-blur-3xl w-full bg-black/60 p-2 text-center'>
            <h2 className='text-ellipsis line-clamp-1 text=lg font-semibold'>{data.title || data?.original_name}</h2>
        </div>
    </Link>
  )
}

export default ExploreCard