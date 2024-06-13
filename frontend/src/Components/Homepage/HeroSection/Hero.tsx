
import HeroImg from '../../../../public/filename.png'

const Hero = () => {
  return (
    <div className='flex items-center justify-center h-[80vh]'>
        <div className="flex flex-col justify-center  items-start bg-white">
            <h1 className="text-8xl  font-serif p-4 font-bold"> Let us Work <br/> With you.  </h1>
            <span className="text-sm p-3 font-sans font-extralight ">Our solution streamlines communication with local governments, facilitating efficient <br/>   reporting and resolution of community issues while minimizing administrative overhead.</span>
              <button className="mx-4  px-6 py-3 border-2  border-accent-2 text-white hover:border-black hover:bg-white hover:text-black shadow-md hover:border-b-2  bg-accent-2 rounded-full">Report an Issue Now  <i className="fa fa-arrow-right"></i> </button>
        </div>
        <div className='p-4 bg-blend-darken  '>
          <img src={HeroImg}  className="h-[70vh] rounded-lg " alt="Fraustatedperson complaining " />
        </div>

    </div>
  )
}

export default Hero
