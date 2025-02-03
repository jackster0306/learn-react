import { users } from "../route";

export async function GET(_request: Request, 
    { params }: { params : { id: string } }
) {
    const { id } = await params;
    const user = users.find((user) => user.id === parseInt(id));

    return Response.json(user);
}

export async function DELETE(_request: Request, 
    { params }: { params : { id: string }}
) {
    const { id } = await params;
    const userId = parseInt(id);

    const user = users.find(user => user.id === userId);

    if(!user) {
        return Response.json({ message: "User not found" }, { status: 404 });
    }

    const userIndex = users.indexOf(user);

    if(userIndex > -1) {
        users.splice(userIndex, 1);
    }

    return new Response(JSON.stringify(users), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 201
    });
}

export async function PATCH(request: Request, 
    { params }: { params : { id: string }}
) {
    const { id } = await params;
    const userId = parseInt(id);

    const { name } = await request.json();

    const user = users.find(user => user.id === userId);

    if(!user) {
        return Response.json({ message: "User not found" }, { status: 404 });
    }

    const userIndex = users.indexOf(user);

    users[userIndex].name = name;

    return new Response(JSON.stringify(users), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 201
    });
}