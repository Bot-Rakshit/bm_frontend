const Background = () => {
    return (
        <div className='contain-paint h-full w-full absolute'>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 z-0" />
            {/* Depth elements */}
            <div className="absolute top-20 -left-20 w-64 h-64 bg-neon-green opacity-10 rounded-full filter blur-3xl" />
            <div className="absolute bottom-20 -right-20 w-80 h-80 bg-neon-green opacity-10 rounded-full filter blur-3xl" />
        </div>
    )
}

export default Background