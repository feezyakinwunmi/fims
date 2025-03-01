import React from "react";
// import { Footer } from "./components/footer";
import { Header } from "@/app/(root)/components/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  // const currentUser = await getCurrentUser();
  // if (!currentUser) return redirect("/sign-in");

  return (
    <div className="flex flex-col transition-all overflow-x-hidden duration-500 relative ">
      {/* <Sidebar {...currentUser} /> */}
     
      <Header />

      <main className="w-full flex-1">{children}</main>

      
    </div>
  );
};
export default Layout;
