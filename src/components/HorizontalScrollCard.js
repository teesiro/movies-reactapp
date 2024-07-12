import React, { useRef } from 'react'
import Card from './Card'
import { useSelector } from 'react-redux'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

const HorizontalScrollCard = ({data = [], heading, trending, media_type}) => {
    const containerRef = useRef()

    const handleNext = () => {
        containerRef.current.scrollLeft += 300
    }
    const handlePrevious = () => {
        containerRef.current.scrollLeft -= 300
    }

  return (
    <div className='container mx-auto px-3 my-10'>
    <h2 className='text-xl font-bold lg:text2xl mb-3 text-white capitalize'>{heading}</h2>

      <div className='relative'>
            <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden relative z-10 overflow-x-scroll scroll-smooth transition-all scrollbar-none'>
            {
                data.map((data,index) => {
                return (
                    <Card key={data.id+"heading"+index} data={data} index={index+1}  trending={trending} media_type={media_type}/>
                )
                })
            }
            </div>

            <div className='absolute top-0 hidden lg:flex justify-between w-full h-full items-center overflow-hidden'>
                <button onClick={handlePrevious} className='bg-white text-black p-1 rounded-full z-10'>
                    <FaAngleLeft />
                </button>
                <button onClick={handleNext} className='bg-white text-black p-1 rounded-full z-10'>
                    <FaAngleRight />
                </button>
            </div>
      </div>
  </div>
  )
}

export default HorizontalScrollCard