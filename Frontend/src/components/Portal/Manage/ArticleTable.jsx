import { useParams, useNavigate } from "react-router-dom";

const ArticleTable = ({ initialTableData }) => {

  const navigate = useNavigate();
  const { manageType } = useParams();

  return (
  <table className="relative w-full text-left border-y table-auto"> 
    <thead>
      <tr>
        <th className="border-y-2 border-black py-2">Title</th>
        <th className="border-y-2 border-black py-2">Date</th>
      </tr>
    </thead>
    <tbody>
      {initialTableData?.map((row, index) => (
        <tr 
          key={index}
          className="group hover:bg-gray-100 hover:cursor-pointer" 
          onClick={() => {
            navigate(`/manage/${manageType}/individual-view`, {
            state: { 
            title: row.title,
            date: row.date,
            content: row.content
            },
           })}}>
          <th className="border-y py-2 font-medium">{row.title}</th>
          <th className="border-y py-2 font-medium">{row.date}</th>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default ArticleTable;