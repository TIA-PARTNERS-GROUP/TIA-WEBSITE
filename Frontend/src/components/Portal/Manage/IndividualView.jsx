import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import PrimaryButton from "../../Button/PrimaryButton";
import SecondaryButton from "../../Button/SecondaryButton";
import { publishCaseStudy } from "../../../api/caseStudies";
import { publishTestimonial } from "../../../api/testimonials";
import { publishBlog } from "../../../api/blogs";

const IndividualView = () => {
  const location = useLocation();
  const { manageType } = useParams();
  const navigate = useNavigate();
  const isDraft = location.state?.status === "draft";
  const [isSaving, setIsSaving] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long', 
      year: 'numeric'
    });
  };

  const handleCancel = () => {
    window.scrollTo(0, 0);
    navigate(`/manage/${manageType}/table-view`);
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      setIsSaving(true);
      const id = Number(location.state?.id);
        try {
          let result;
          switch (manageType) {
            case "case-studies":
              result = await publishCaseStudy(Number(id))
              break;
            case "testimonials":
              result = await publishTestimonial(Number(id))
              break;
            case "blogs":
              result = await publishBlog(Number(id))
              break;
          }
          
          window.scrollTo(0, 0);
          navigate(`/manage/${manageType}/table-view`);
        } catch (error) {
          console.error('Error publishing:', error);
        }
      }

  return (
    <div>
      <h2 className="pt-6 pb-1 text-2xl text-center font-semibold">{location.state?.title || 'No title avaliable'}</h2>
      <h2 className="text-md text-center font-normal">Date published: {formatDate(location.state?.date) || 'No date avaliable'}</h2>
      <div 
        className="ql-editor" 
        dangerouslySetInnerHTML={{ __html: location.state?.content || '' }}
      />
      <div className="pt-20 flex gap-x-6 items-center flex">
        <SecondaryButton type="button" className="px-20" onClick={() => (handleCancel())}>Cancel</SecondaryButton>
        {isDraft && <PrimaryButton onClick={(event)=>(handleSubmit(event))} type="submit">Publish</PrimaryButton>}
        {isSaving && <p>Saving...</p>}
      </div>
    </div>
  )
}

export default IndividualView;