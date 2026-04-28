// Your 1MB Supabase Video
const heroVideo = "https://nsqgfrsugkvsftnffeno.supabase.co/storage/v1/object/public/videos/vecteezy_young-woman-cleaning-computer-with-rag-in-office_28691645%20(1)%20(2).mp4";

const HeroBackground = () => {
  return (
    <div className='relative w-full h-full min-h-screen bg-zinc-950 overflow-hidden isolate'>

      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        className='absolute inset-0 w-full h-full object-cover opacity-80'
      >
        <source src={heroVideo} type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay: 
          Makes the video look "premium" and ensures white text pops 
          even if the video has bright frames.
      */}
      <div className='absolute inset-0 bg-linear-to-t from-emerald-950/80 via-emerald-900/60 to-transparent brightness-50' />

    </div>
  )
}

export default HeroBackground;