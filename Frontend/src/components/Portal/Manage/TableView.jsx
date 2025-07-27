import ArticleTable from "../../../components/Portal/Manage/ArticleTable";
import UserArtifactsList from "../../../components/Portal/Manage/UserArtifactsList";

const TableView = ( {initialTableData} ) => {
  return (
  <div>
    <UserArtifactsList />
    <div className="p-8">
      <ArticleTable initialTableData={initialTableData}/>
    </div>
  </div>
  )
}

export default TableView;