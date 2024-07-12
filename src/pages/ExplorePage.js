import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import ExploreCard from '../components/ExploreCard';

const ExplorePage = () => {
  const params = useParams()
  const [pageNo, setPageNo ] = useState(1)
  const [ data, setData] = useState([])
  const [ totalPageNo, setTotalPageNo ] = useState(0)

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo
        }
      });
      setData((prev) => [
        ...prev,
        ...response.data.results
      ]);
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.log('error', error);
    }
  }, [params.explore, pageNo]);

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNo(prev => prev + 1)
    }
  }

  useEffect(() => {
    fetchData();
  }, [fetchData, pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore, fetchData]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalPageNo]);

  return (
    <div className='py-16'>
      <div className='container m-auto p-2'>
        <h3 className='capitalize lg:text-2xl text-lg font-semibold my-3'>Popular {params.explore} Show</h3>

        <div className='grid grid-cols-[repeat(auto-fit,minmax(119px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(230px, 1fr))] gap-7 lg:gap-4 lg:justify-start'>

          {
            data.map((exploreData,index) => {
              return (
                <ExploreCard data={exploreData} key={`${exploreData.id}-${index}`} media_type={params.explore} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ExplorePage