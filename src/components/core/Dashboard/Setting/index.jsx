import ChangeProfilePicture from "./ChangeProfilePicture";

export default function Setting() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-richblack-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white mb-4">Edit Profile</h1>

      {/* Change Profile Picture */}
      <div className="flex justify-center">
        <ChangeProfilePicture />
      </div>
    </div>
  );
}
