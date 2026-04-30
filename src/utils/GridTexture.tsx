export const GridTexture = ({ size = 2 }: { size?: number }) => { 
  size = size < 1 ? 1 : size;
  return (
    <>
     {/* Grid Texture - Masked to bottom-left corner only */}
      <div 
        className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at bottom left, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at bottom left, black 0%, transparent 70%)',
        }}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: `${8 * size}px ${8 * size}px`,
          }}
        />
      </div>
    </>
  )
}