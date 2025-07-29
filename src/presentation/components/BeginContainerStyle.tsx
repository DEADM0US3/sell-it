



const BeginContainerStyle:
    React.FC<{
        children: React.ReactNode
    }>
= (
    { children }
) => {


    return (
        <>
            <div className="absolute w-full h-[80dvh] overflow-hidden -z-10">
                <svg
                    className="absolute inset-0 w-full h-full scale-x-[-1]"  // 👈 inversión horizontal
                    viewBox="0 0 1440 300"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#2563eb"
                        d="M0,160 C360,500 1080,0 1440,160 L1440,0 L0,0 Z"
                    />
                </svg>
            </div>


            {children}
        </>
    );
};

export default BeginContainerStyle;