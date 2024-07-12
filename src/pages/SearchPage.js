import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ExploreCard from '../components/ExploreCard'

const SearchPage = () => {
  const location = useLocation()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const fetchData = async (query) => {
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query: query,
          page: page
        }
      })
      setData(response.data.results)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q')
    if (query) {
      fetchData(query)
    }
  }, [location.search])

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPage(prev => prev + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll) 
  }, [])

  return (
    <div className='py-16'>

      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input type="text"
        placeholder='Search movie,shows...'
        onChange={(e)=> navigate(navigate(`/search?q=${e.target.value}`))} 
        className='px-4 py-1 text-lg w-full bg-neutral-800 rounded-full outline-none text-neutral-100' />
      </div>

      <div className='container mx-auto'>
        <h3 className='capitalize lg:text-2xl text-lg font-semibold my-3'>Search Results...</h3>

        <div className='grid grid-cols-[repeat(auto-fit,minmax(119px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(230px, 1fr))] gap-7 lg:gap-4 lg:justify-start p-2'>
          {data.map((searchData, index) => (
            <ExploreCard data={searchData} key={`${searchData.id}-${index}`} media_type={searchData.media_type} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
