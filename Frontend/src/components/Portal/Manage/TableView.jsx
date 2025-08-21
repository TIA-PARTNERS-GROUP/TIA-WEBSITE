import ArticleTable from "../../../components/Portal/Manage/ArticleTable";
import UserArtifactsList from "../../../components/Portal/Manage/UserArtifactsList";

const TableView = ( {initialTableData} ) => {
  return (
  <div>
    <UserArtifactsList />
    <div className="sm:p-4 md:p-6 lg:p-8">
      <ArticleTable initialTableData={initialTableData}/>
    </div>
  </div>
  )
}

export default TableView;