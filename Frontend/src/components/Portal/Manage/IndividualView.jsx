import { useLocation } from "react-router-dom";

const IndividualView = () => {
  const location = useLocation();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long', 
      year: 'numeric'
    });
  };

  return (
    <div>
      <h2 className="pt-6 pb-1 text-2xl text-center font-semibold">{location.state?.title || 'No title avaliable'}</h2>
      <h2 className="text-md text-center font-normal">Date published: {formatDate(location.state?.date) || 'No date avaliable'}</h2>
      <div 
        className="ql-editor" 
        dangerouslySetInnerHTML={{ __html: location.state?.content || '' }}
      />
    </div>
  )
}

export default IndividualView;