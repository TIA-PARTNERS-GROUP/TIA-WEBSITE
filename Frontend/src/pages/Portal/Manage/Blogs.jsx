import UserArtifactsList from "../../../components/Portal/Manage/UserArtifactsList";

const Blogs = () => {
  return (
    <div className="bg-white rounded-xl px-8 py-2">
        <h2 className="pt-10 text-4xl @md:text-3xl font-semibold text-black-800 pb-4">Blogs</h2>
        <UserArtifactsList />
    </div>
  );
};

export default Blogs;