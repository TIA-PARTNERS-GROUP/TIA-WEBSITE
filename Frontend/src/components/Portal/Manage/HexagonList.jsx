const HexagonList = ({ listData }) => (
  <div className="container text-left gap-2">
        {listData.map((item, index) => (  
          <div key={index} className="py-2">
            <div className="grid grid-cols-[auto_1fr] gap-6 w-full items-center">
                <div className="relative w-10 h-12 min-w-[14px]">
                    <div className="
                    absolute inset-0 bg-violet-600
                    [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]
                    "></div>
                    
                    <div className="
                    absolute inset-[2px] bg-white
                    [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]
                    flex items-center justify-center
                    text-violet-600 font-bold
                    ">
                    {index + 1}
                    </div>
            </div>
              <p className="text-md">{item.description}</p>
            </div>
          </div>
        ))}
  </div>
)

export default HexagonList;