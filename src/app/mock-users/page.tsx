
import { revalidatePath } from "next/cache";

type MockUser = {
    id: number;
    name: string;
}


export default async function MockUsers(){
    const response = await fetch("https://67a1655f5bcfff4fabe252fe.mockapi.io/users");
    const users = await response.json();

    async function addUser(formData: FormData) {
        "use server"
        const name = formData.get("name") as string;
        const response = await fetch("https://67a1655f5bcfff4fabe252fe.mockapi.io/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        const newUser = await response.json();
        revalidatePath("/mock-users");
        console.log(newUser);
    }

    return (
        <div className="py-10 px-5">
            <form action={addUser} className="mb-4">
                <input 
                type="text" 
                name="name" required
                placeholder="Enter name"
                className="border p-2 mr-2 rounded text-black placeholder-gray-500" 
                />
                <button 
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add User
                </button>
            </form>
            <div className="grid grid-cols-4 gap-4 py-10">
            {users.map((user: MockUser) => (
                <div
                    key={user.id}
                    className="p-4 bg-white shadow-md rounded-lg text-gray-700"
                >
                    {user.name}
                </div>
            ))}
        </div>
        </div>
    );
}