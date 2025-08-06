import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import PrimaryButton from '../../Button/PrimaryButton';

const WriteView = () => {

  const navigate = useNavigate();
  const { manageType } = useParams();

  const [title, setTitle] = useState('');
  const [articleData, setArticleData] = useState(null);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (quillInstance.current) {
      const content = quillInstance.current.root.innerHTML;
      const delta = quillInstance.current.getContents();
      const type = manageType;
      const date = new Date().toLocaleDateString();

      console.log(content, delta);

      setArticleData({ title, content, delta, type, date });

      navigate(`/manage/${manageType}/table-view`, {
      state: { 
        newArticle: { 
          title, 
          type, 
          date,
          content 
        } 
      },
      replace: true
    });
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
        
        <div className="py-8">
            <PrimaryButton type="submit">Publish</PrimaryButton>
        </div>
      </form>
    </div>
  );
};
export default WriteView;