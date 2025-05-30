import { UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <div className="p-4 shadow-sm border flex justify-between items-center">
      <div></div>
      
      {/* Wrap UserButton and scale it up */}
      <div className="scale-125 origin-center">
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
