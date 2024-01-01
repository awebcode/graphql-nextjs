import { useMutation } from "@apollo/client";
import { ADD_USER_MUTATION } from "./mutations"; // Replace with your mutation file location
import { IUser } from "@/interfaces/userInterFace";

const AddUser = () => {
  const [addUser, { data, loading, error }] = useMutation<{ addUser: IUser }>(
    ADD_USER_MUTATION
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("submit", name, email, password);
    try {
      const result = await addUser({
        variables: {
          name,
          email,
          password,
        },
      });
      console.log("User added:", result.data?.addUser);
      // You can add further logic upon successful user addition
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  // const handleSubmit = async (formData: FormData) => {
  //   const name = formData.get("name");
  //   const email = formData.get("email");
  //   const password = formData.get("password");
  //   console.log("submit", name, email, password);
  //   try {
  //     const result = await addUser({
  //       variables: {
  //         name,
  //         email,
  //         password,
  //       },
  //     });
  //     console.log("User added:", result.data?.addUser);
  //     // You can add further logic upon successful user addition
  //   } catch (error) {
  //     console.error("Error adding user:", error);
  //   }
  // };

  //$$$NOTE :: when use form action for submit then loading not working.

  console.log("currentDAta", data, loading, error);

  return (
    <>
      {data && (
        <div>
          <h1>{data.addUser.name}</h1>
          <h1>{data.addUser.email}</h1>
          <h1>{data.addUser.password}</h1>
        </div>
      )}
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
