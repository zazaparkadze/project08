import { NextRequest, NextResponse } from "next/server";
import User from "@/model/User";
import connectDB from "@/lib/connectDB";
import { rolesList } from "@/config/rolesList";
import bcrypt from "bcrypt";

export function OPTIONS(request: NextRequest) {
  connectDB();
  const origin = request.headers.get("origin");
  return NextResponse.json(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin!,
      "Access-Controll-Allow-Credentials": "true",
    },
  });
}
// Delete
export async function DELETE(request: NextRequest) {
  connectDB();
  const origin = request.headers.get("origin");
  const headers = {
    "Access-Control-Allow-Origin": origin!,
    "Access-Controll-Allow-Credentials": "true",
  };

  const { user } = await request.json();
  const userId = isNaN(Number(user)) ? user : Number(user);
  if (typeof userId === "string") {
    const result = await User.findOneAndDelete({ username: userId });
    //
    if (!result) {
      return NextResponse.json(null, {
        status: 404,
        statusText: "user not found",
        headers: headers,
      });
    }
    //
    if (result.username === userId) {
      return NextResponse.json(result, {
        status: 200,
        headers: headers,
      });
    }
  } else {
    const result = await User.findOneAndDelete({ id: userId });
    if (!result) {
      return NextResponse.json(null, {
        status: 404,
        statusText: "user not found",
        headers: headers,
      });
    }
    //
    if (result.id === userId) {
      return NextResponse.json(result, {
        status: 200,
        headers: headers,
      });
    }
  }
}
//update password or Add role
export async function PUT(request: NextRequest) {
  connectDB();
  const origin = request.headers.get("origin");
  const headers = {
    "Access-Control-Allow-Origin": origin!,
    "Access-Controll-Allow-Credentials": "true",
  };
  const { user, role, pwd } = await request.json();

  const foundUser = await User.findOne({ username: user });

  if (!foundUser) {
    return NextResponse.json(
      { message: `user ${user} not found` },
      {
        status: 400,
        statusText: "Bad request, No user",
        headers: headers,
      }
    );
  }

  if (!role && !pwd) {
    return NextResponse.json(
      { message: `no data recieved for that user to update` },
      {
        status: 400,
        statusText: "Bad request, No data",
        headers: headers,
      }
    );
  }

  if (role) {
    foundUser.roles = { ...foundUser.roles, [role]: rolesList[role] };
    await foundUser.save();
  }
  if (pwd) {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    foundUser.password = hashedPwd;
    await foundUser.save();
  }

  return NextResponse.json(
    { message: `user ${user} updated` },
    {
      status: 200,
      statusText: "Roles updated successfully",
      headers: headers,
    }
  );
}
//Delete role
export async function PATCH(request: NextRequest) {
  connectDB();
  const origin = request.headers.get("origin");
  const headers = {
    "Access-Control-Allow-Origin": origin!,
    "Access-Controll-Allow-Credentials": "true",
  };

  const { user, role } = await request.json();
  console.log(user, role);

  const foundUser = await User.findOne({
    username: user,
    [`roles.${role}`]: rolesList[role],
  });

  if (!foundUser) {
    return NextResponse.json(
      { message: `user ${user} not found / or no role` },
      {
        status: 400,
        statusText: "No user or No Role",
        headers: headers,
      }
    );
  }
  console.log(foundUser);

  const foundRoles = foundUser.roles;

  const { [role]: _, ...rest } = foundRoles;
  foundUser.roles = rest;
  await foundUser.save();

  return NextResponse.json(
    { message: `user ${user} role ${role} deleted` },
    {
      status: 200,
      statusText: " Role deleted",
      headers: headers,
    }
  );
}
