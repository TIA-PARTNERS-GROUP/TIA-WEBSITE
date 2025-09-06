import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addCaseStudy } from '../../../api/caseStudies';
import { addTestimonial } from '../../../api/testimonials';
import { addBlog } from '../../../api/blogs';
import Quill from 'quill'; // Used for rich text editor
import 'quill/dist/quill.snow.css';
import PrimaryButton from '../../Button/PrimaryButton';
import SecondaryButton from '../../Button/SecondaryButton';


const WriteView = () => {

  const navigate = useNavigate();
  const { manageType } = useParams();

  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [publishingStatus, setPublishingStatus] = useState("draft");

  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        modules: {
          toolbar: '#toolbar-container'
        },
        theme: 'snow',
        placeholder: 'Write your content here...'
      });
    }
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleCancel = () => {
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => input.removeAttribute('required'));
    window.scrollTo(0, 0);
    navigate(`/manage/${manageType}/table-view`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    if (quillInstance.current) {
      const content = quillInstance.current.root.innerHTML;
      const delta = quillInstance.current.getContents();
      const type = manageType;
      const date = new Date().toISOString();

      console.log(content, delta);

      try {
        let result;
        switch (manageType) {
          case "case-studies":
            result = await addCaseStudy(title, date, content, publishingStatus);
            break;
          case "testimonials":
            result = await addTestimonial(title, date, content, publishingStatus);
            break;
          case "blogs":
            result = await addBlog(title, date, content, publishingStatus);
            break;
        }
        
        window.scrollTo(0, 0);
        navigate(`/manage/${manageType}/table-view`);
      } catch (error) {
        console.error('Error adding content:', error);
      }
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <p className="pt-4 pb-1 text-md font-semibold">TITLE</p>
            <input 
                autoFocus 
                type="text" 
                value={title}
                onChange={handleTitleChange}
                className="border-b-2 placeholder-gray-300" 
                placeholder="Insert Title Here..." 
                autoComplete="new-password" 
                required
            />
        </div>

        <div className="form-group">
            <p className="pt-8 pb-2 text-md font-semibold">CONTENT</p>
            <div id="toolbar-container">
                <select className="ql-header">
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option selected>Normal</option>
                </select>
                <button className="ql-bold">Bold</button>
                <button className="ql-italic">Italic</button>
                <button className="ql-underline">Underline</button>
                <button className="ql-image">Image</button>
            </div>
            
            <div ref={editorRef} style={{ height: '300px' }}></div>
        </div>
        
        <div className="pt-20 flex gap-x-6 items-center">
            <SecondaryButton type="button" className="px-20" onClick={() => (handleCancel())}>Cancel</SecondaryButton>
            <PrimaryButton onClick={() => (setPublishingStatus("draft"))} type="submit">Save as Draft</PrimaryButton>
            <PrimaryButton onClick={() => (setPublishingStatus("published"))} type="submit">Publish</PrimaryButton>
            {saving && <p>Saving...</p>}
        </div>
      </form>
    </div>
  );
};
export default WriteView;