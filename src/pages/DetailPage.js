import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchDetail from '../hooks/useFetchDetail';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../components/Divider';
import useFetch from '../hooks/useFetch';
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import VideoPlay from '../components/VideoPlay';

const DetailPage = () => {
  const params = useParams();
  const { data } = useFetchDetail(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetail(`/${params?.explore}/${params?.id}/credits`);
  const imageURL = useSelector(state => state.movflixData.imageURL);
  const { data : similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`)
  const { data : recommendationData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`)
  const [playVideo, setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState("")

  const handlePlayVideo = (data) => {
    setPlayVideoId(data)
    setPlayVideo(true)
  }
  
  const duration = (Number(data?.runtime) / 60).toFixed(1).split(".");
  const writers = castData?.crew
    ?.filter(el => el?.job === "Writer" || el?.job === "Screenplay" || el?.job === "Story")
    ?.map(el => el?.name)
    ?.join(", ");
  const director = castData?.crew?.find(el => el?.job === "Director")?.name;

  return (
    <div className='w-full  mt-[69px] lg:mt-0'>
      <div className='w-full h-[350px] lg:h[450px] relative '>
        <div className='w-full h-full'>
          <img src={imageURL + data?.backdrop_path} 
          className='h-full w-full object-cover' alt='' />
        </div>

        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-row gap-1 lg:gap-10 '>
        <div className='relative mx-auto lg:-mt-28 w-fit lg:mx-0 min-w-60 hidden lg:block'>
          <img src={imageURL + data?.poster_path} 
          className='h-80 lg:w-60 object-cover rounded' alt='' />
        </div>

        <div>

          <div className='flex justify-between'>
              <div>
                <h2 className='text-2xl lg:text-4xl font-bold text-white'>{data?.title || data?.original_name}</h2>
                <p className='text-neutral-400'>{data?.tagline}</p>
              </div>
              <button onClick={() => handlePlayVideo(data)} className='mt-3 w-[90px] lg:w-[150px] h-[30px] lg:h-[50px] px-1 lg:px-4 text-center bg-white text-black rounded font-bold text-sm lg:text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>Play Now</button>
          </div>

          <Divider />

          <div className='flex items-center my-1 gap-3'>
            <p>
              Rating : {Number(data?.vote_average).toFixed(1)}+
            </p>
            <p>
              View : {Number(data?.vote_count)}
            </p>
            <p>Duration : {duration[0]}h {duration[1]}m</p>
          </div>

          <div>
            <h3 className='text-2xl font-bold text-white mb-1'>Overview</h3>
            <p>{data?.overview}</p>

            <Divider />
            <div className='flex items-center gap-3 mt-4'>
              <p>Status : {data?.status},</p>
              <p>Released Date : {moment(data?.release_date).format("MMMM Do YYYY")}</p>
            </div>

            <Divider />
          </div>

          <div>
            <p>Director: {director || "N/A"}</p>
            <p>Writer: {writers || "N/A"}</p>
          </div>

          <Divider/>
          <h2 className='font-bold text-lg'>Cast :</h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-10 lg:gap-5'>{castData?.cast?.filter(el => el.profile_path).map((starCast,index) => {
            return (
              <div>
                <div>
                  <img src={imageURL+starCast?.profile_path}
                  className='w-24 h-24 object-cover rounded-full' alt=''
                   />
                </div>
                <p className='font-bold text-center text-sm'>{starCast?.name}</p>
              </div>
            )
          })}</div>
        </div>
      </div>

      <div>
        <HorizontalScrollCard data={similarData} heading={"Similar "+params?.explore} media_type={params?.explore} />
        <HorizontalScrollCard data={recommendationData} heading={"Recommended "+params?.explore} media_type={params?.explore} />
      </div>

        {
          playVideo && (
            <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params?.explore} />
          )
        }
    </div>
  );
}
export default DetailPage;