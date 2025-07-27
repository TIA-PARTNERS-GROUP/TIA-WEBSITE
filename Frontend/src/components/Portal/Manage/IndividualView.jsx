import { useLocation } from "react-router-dom";

const IndividualView = () => {
  const location = useLocation();

  console.log(location.state.content);

  return (
    <div>
      <h2 className="pt-6 pb-1 text-2xl text-center font-semibold">{location.state?.title || 'No title avaliable'}</h2>
      <h2 className="text-md text-center font-normal">Date published: {location.state?.date || 'No date avaliable'}</h2>
      <div 
        className="ql-editor" 
        dangerouslySetInnerHTML={{ __html: location.state?.content || '' }}
      />
    </div>
  )
}

export default IndividualView;